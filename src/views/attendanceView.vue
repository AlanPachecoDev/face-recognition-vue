<template>
<div class="attendanceScreen">
  <div class="attendanceContainer" v-for="(att, index) in attendance" :key="att.date" style="background-color: white;">
    <div class="attendanceHeader">
      <h2>Lista del día {{ att.date }}</h2>
    </div>
    <div class="attendanceBody">
      <div class="tableContainer">
        <table class="attendanceTable smallTable">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(atd, index) in att.attendants" :key="atd.uuid">
              <td>{{ atd.name }}</td>
              <td>{{ atd.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </div>
</template>

<style>
.attendanceTable.smallTable {
  width: 80%; /* Ajusta el ancho de la tabla según tus necesidades */
}

.attendanceScreen {
  background-color: #f2f2f2; /* Color de fondo personalizado */
}

.attendanceContainer {
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

.attendanceHeader {
  background-color: #ffffff;
  padding: 10px;
}

.attendanceBody {
  max-height: 300px; /* Ajusta la altura máxima deseada */
  overflow-y: auto;
}

.tableContainer {
  overflow-x: auto;
}

.attendanceTable {
  width: 100%;
  border-collapse: collapse;
}

.attendanceTable th,
.attendanceTable td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid black;
  background-color: white;
}

.attendanceTable th {
  background-color: #f2f2f2;
}

.attendanceBody table {
  min-width: 100%; /* Para que la tabla ocupe el ancho mínimo */
}

.attendanceBody::-webkit-scrollbar {
  width: 5px; /* Ancho del scrollbar */
}

.attendanceBody::-webkit-scrollbar-thumb {
  background-color: #888; /* Color del scrollbar */
  border-radius: 5px; /* Borde redondeado del scrollbar */
}

.attendanceBody::-webkit-scrollbar-track {
  background-color: #f2f2f2; /* Color del fondo del scrollbar */
}
</style>


<script>
import { getAttendance } from '../firebase/manageReports.js';

export default {
    data() {
        return {
            attendance: [],
        }
    },
    async mounted() {
        this.attendance = await getAttendance();

        console.log("this.attendance: ", this.attendance)
    }

}
</script>

