<template>
  <h2 class="Texto">Por favor asegúrese de que su rostro se vea en la cámara para poder ser detectado</h2>
  <div class="camera">
    <video id="video" autoplay muted width="720" height="540"></video>
    <canvas id="canvas" width="720" height="540"></canvas>
    <div class="bubble-container">
      <div v-for="index in 20" :key="index" class="bubble"></div>
    </div>
  </div>

   <div class="burbujas">
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
    <div class="burbuja"></div>
  </div>

  <div class="burbujas">
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
    <div class="burbuja2"></div>
  </div> 
</template>


<script>
import { startDetection, descargarImagen } from '../face-api/detectionLogic.js';
import { getImages, getUsers } from '../firebase/manageUsers.js';
import { addAttendance } from '../firebase/manageReports.js';

//Alertas
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        name: "",
        lastname: "",
        image: "",
      },
    };
  },
  async mounted() {
    const users = await getUsers();
    console.log("users: ", users);
    console.log("Empieza");
    const res = await startDetection(users);
    console.error("RES: ", res);

    if (res) {
      const resAtt = await addAttendance(res.name + " " + res.lastname, res.id);

      if (resAtt) {
        await this.$swal({
          title: "Usuario añadido a la lista.",
          text: 'El estudiante ' + res.name + " " + res.lastname + " está presente.",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      } else {
        await this.$swal({
          title: "Usuario detectado pero no añadido a la lista",
          text: 'El estudiante ' + res.name + " " + res.lastname + " fue detectado pero ocurrió un error al subirlo a la lista.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      }

      const result = await this.$swal({
        title: '¿Qué desea hacer?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Tomar asistencia',
        cancelButtonText: "Ver reporte",
      });

      if (result.isConfirmed) {
        this.$router.go(0);
      } else {
        this.$router.push('/attendance');
      }
    } else {
      await this.$swal({
        title: "Estudiante no encontrado",
        text: 'El rostro no se encuentra registrado en nuestra base de datos.',
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "OK",
      });

      const result = await this.$swal({
        title: '¿Qué desea hacer?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Tomar asistencia',
        cancelButtonText: "Ver reporte",
      });

      if (result.isConfirmed) {
        this.$router.go(0);
      } else {
        this.$router.push('/attendance');
      }
    }
  },
    methods: {
    randomBubbleStyle(index) {
      const delay = Math.random() * 5 + 1; // Ajusta el rango de tiempo de retraso entre las burbujas
      return {
        animationDelay: `${delay}s`,
      };
    },
  },
};
</script>

<style scoped>
#video {
  position: relative;
  margin-left: 26%;
  margin-top: 3%;
  border-radius: 10px;
}

.Texto {
  color: white;
  font-size: 20px;
  text-align: center; 
  border-radius: 10px;
  padding: 10px;  
  width: 50%;
  margin: 0 auto;
  margin-top: 10px;
}

.camera {
  position: relative;
}

</style>
