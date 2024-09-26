import { createRouter, createWebHistory } from "vue-router";

//Componentes
import authView from "../views/authView.vue";
import FaceDetectorView from '../views/FaceDetectorView.vue';
import attendanceView from "@/views/attendanceView.vue";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "auth",
      component: authView,
    },
    {
      path: "/faceDetector",
      name: "faceDetector",
      component: FaceDetectorView,
    },
    {
      path: "/attendance",
      name: "attendance",
      component: attendanceView,
    },
  ],
});

export default router;
