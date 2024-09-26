//Importar acceso a firebase
import {
  db,
  ref,
  uploadBytes,
  storage,
  getDownloadURL,
  collection,
  addDoc,
  listAll,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
  arrayUnion,
} from "../firebase/config.js";

function getCurrentDate() {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`;
}

function getCurrentTime() {
  const currentTime = new Date();

  const hours = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

async function addAttendance(name, uuid) {
  try {
    const date = getCurrentDate();
    const time = getCurrentTime();

    // Verificar si ya existe un documento con la fecha proporcionada
    const q = query(collection(db, "attendance"), where("date", "==", date));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Si no existe, crear un nuevo documento con el atributo "date" y el arreglo "attendants"
      await addDoc(collection(db, "attendance"), {
        date: date,
        attendants: [{ name: name, uuid: uuid, time: time }],
      });
    } else {
      // Si existe, agregar un nuevo elemento al arreglo "attendants" del documento existente
      const docId = querySnapshot.docs[0].id;

      await updateDoc(doc(db, "attendance", docId), {
        attendants: arrayUnion({
          name: name,
          uuid: uuid,
          time: time,
        }),
      });
    }

    return true; // Operación exitosa
  } catch (error) {
    console.error("Error al agregar la asistencia:", error);
    return false; // Error al realizar la operación
  }
}

const getAttendance = async () => {
  
    try {
      // Obtener la colección de proyectos en Firestore
      const snapshot = await collection(db, "attendance");
  
      const usersSnapshot = await getDocs(snapshot);
  
      const attendance = usersSnapshot.docs.map((doc) => {
        // Agregar el ID del documento a los datos del proyecto
        return { id: doc.id, ...doc.data() };
      });
  
      // Retornar la lista de proyectos
      return attendance;
    } catch (error) {
      throw error; // Lanzar el error para que sea capturado en el catch del enrutador
    }
  };
export { addAttendance, getAttendance };
