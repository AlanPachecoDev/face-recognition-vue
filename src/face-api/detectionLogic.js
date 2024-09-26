import * as faceapi from "face-api.js";

async function urlToImage(url) {
  // Fetch la imagen como Blob
  const response = await fetch(url);
  const blob = await response.blob();

  // Crea un objeto URL a partir del Blob
  const objectUrl = URL.createObjectURL(blob);

  // Crea el objeto de imagen y espera a que se cargue
  let img = new Image();
  img.src = objectUrl;
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  return img;
}

async function startDetection(images) {
  await Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri("models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    faceapi.nets.ageGenderNet.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models"),
  ]);
  const res = await start(images);
    console.log("A devolver: ", res);
  return res;
}
async function start(images) {
  return new Promise((resolve, reject) => {
    // Iniciar cámara
    navigator.getUserMedia(
      { video: {} },
      async (stream) => {
        //Para iterar las imágenes
        for (let i = 0; i < images.length; i++) {
          //Necesario para iniciar el video de la cámara
          const video = document.getElementById("video");
          video.srcObject = stream;

          let countNoMatch = 0;
          // Detectar caras en tiempo real

          //Variables para manejar el estado de la promesa
          const prom = { state: "", toReturn: false };

          console.error("Imagen actual: ", images[i].name);
          const img = await urlToImage(images[i].image);

          // Detectar caras en la imagen
          const detections = await faceapi
            .detectAllFaces(img)
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender()
            .withFaceDescriptors();
          // creamos el canvas con los elementos de la face api
          const canvas = faceapi.createCanvasFromMedia(video);
          // lo añadimos al body
          document.body.append(canvas);

          // tamaño del canvas
          const displaySize = { width: video.width, height: video.height };
          faceapi.matchDimensions(canvas, displaySize);
          // ponerlas en su sitio
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );

          // limpiar el canvas
          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

          // dibujar las líneas
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

          resizedDetections.forEach((detection) => {
            const box = detection.detection.box;
            new faceapi.draw.DrawBox(box, {
              label: Math.round(detection.age) + " años " + detection.gender,
            }).draw(canvas);
          });

          // Convertir detecciones a objetos reconocibles
          const labeledDescriptors = [
            new faceapi.LabeledFaceDescriptors(
              images[i].name,
              detections.map((d) => d.descriptor)
            ),
          ];

          //0.4 es el umbral que se toma para saber si es el mismo rostro, es decir, si el valor está entre 0 y 0.4
          //Se considera que es el mismo rostro

          //Entre más cercano sea el valor a 0 entonces más es la similitud
          const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.5);
          let faceDetected = true;
          let faceMatched = false;

          async function iterar() {
            const detections = await faceapi
              .detectAllFaces(video)
              .withFaceLandmarks()
              .withFaceDescriptors();
            let bestMatch = "";
            try {
              faceDetected = true;
              bestMatch = faceMatcher.findBestMatch(detections[0].descriptor);
              
            } catch (error) {
              console.log("NO SE DETECTÓ UN ROSTRO");
              faceDetected = false;
              //Si no se detecta un rostro necesito pausar hasta que se detecte uno
            }

            if (faceDetected) {
              if (bestMatch._distance <= 0.5 && bestMatch._distance >= 0) {
                //cuando el rostro coincide devolvemos un true para que sea leído en el componente
                console.log(
                  "El rostro coincide: ",
                  images[i].name,
                  "  |  distance: ",
                  bestMatch._distance
                );
                faceMatched = true;

              } else {
                //Cuando no se detecta no devolvemos nada para que se siga ejecutando
                console.log("El rostro no coincide");
                countNoMatch = countNoMatch + 1;
                if (countNoMatch >= 7) {
                  console.log(
                    "El rostro no coincidió con la imagen actual en 7 intentos, se procede a la siguiente."
                  );
                } else {
                  await iterar();
                }
              }

            }
          }

          await iterar();
          while (!faceDetected) {
            await iterar();
            //setTimeout(iterar, 10000);
          }
          if(faceMatched){
            resolve(images[i]);
            break;
          }
        }

        // Si no se encuentra coincidencia, rechazar la promesa
        resolve(false);
      },
      (err) => reject(err)
    );
  });
}


export { startDetection };

/*

const interval = await setInterval(async () => {
            const detections = await faceapi
              .detectAllFaces(video)
              .withFaceLandmarks()
              .withFaceDescriptors();
            let bestMatch = "";
            try {
              bestMatch = faceMatcher.findBestMatch(detections[0].descriptor);
            } catch (error) {
              console.log("NO SE DETECTÓ UN ROSTRO");
              //Si no se detecta un rostro necesito pausar hasta que se detecte uno
              return;
            }

            if (bestMatch._distance <= 0.5 && bestMatch._distance >= 0) {
              //cuando el rostro coincide devolvemos un true para que sea leído en el componente
              console.log(
                "El rostro coincide: ",
                images[i].nombre,
                "  |  distance: ",
                bestMatch._distance
              );

              //Se establece el estado de la promesa
              prom.state = "success";
              prom.toReturn = true;

              clearInterval(interval);
              
            } else {
              //Cuando no se detecta no devolvemos nada para que se siga ejecutando
              console.log("El rostro no coincide");
              countNoMatch = countNoMatch + 1;
              if (countNoMatch >= 7) {
                console.log(
                  "El rostro no coincidió con la imagen actual en 7 intentos, se procede a la siguiente."
                );
                clearInterval(interval);
              }
            }
          }, 1000);
          console.error("SE RESUELVE");*/
