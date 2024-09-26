//Importar acceso a firebase
import {
  db,
  ref,
  uploadBytes,
  storage,
  getDownloadURL,
  collection,
  addDoc,
  listAll,getDocs,
} from "../firebase/config.js";

async function createUser(user) {
  const { email, password, name, lastname, image } = user;
  let imageUrl = "";
  //Primero se sube la imagen
  if (!image) {
    console.log("No se ha seleccionado ninguna imagen");
    return;
  }

  const file = image;
  const storageRef = ref(storage, "images/" + file.name);

  try {
    await uploadBytes(storageRef, file);
    console.log("La imagen se cargó correctamente");

    imageUrl = await getDownloadURL(storageRef);
    console.log("URL de la imagen:", imageUrl);
  } catch (error) {
    console.log("Error al cargar la imagen:", error);
    return false;
  }

  try {
    const docRef = await addDoc(collection(db, "users"), {
      email,
      password,
      name,
      lastname,
      image: imageUrl,
    });
    console.log("DocRef: ", docRef);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

const getUsers = async () => {

  try {
    // Obtener la colección de proyectos en Firestore
    const snapshot = await collection(db, "users");

    const usersSnapshot = await getDocs(snapshot);

    const users = usersSnapshot.docs.map((doc) => {
      // Agregar el ID del documento a los datos del proyecto
      return { id: doc.id, ...doc.data() };
    });

    // Retornar la lista de proyectos
    return users;
  } catch (error) {
    throw error; // Lanzar el error para que sea capturado en el catch del enrutador
  }
};

async function getImages() {
  try {
    const bucketRef = ref(storage, "images");
    const imagenes = [];

    // Obtiene la lista de todos los elementos del bucket
    const elementos = await listAll(bucketRef);

    // Itera sobre cada elemento y agrega las imágenes a la lista
    elementos.items.forEach(async (itemRef) => {
      // Obtiene la URL de descarga de la imagen
      const url = await getDownloadURL(itemRef);

      // Crea un objeto con la información de la imagen
      const imagen = {
        nombre: itemRef.name,
        url: url,
      };

      // Agrega la imagen a la lista
      imagenes.push(imagen);
    });

    return imagenes;
  } catch (error) {
    console.error("Error al obtener las imágenes:", error);
  }
}
export { createUser, getImages, getUsers };
