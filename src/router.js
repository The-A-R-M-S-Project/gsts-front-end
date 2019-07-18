import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import AdminDashboard from "./views/AdminDashboard.vue";
import Departments from "./views/Departments.vue";
import StudentDetails from "./views/AdminStudentView.vue";
import Examiners from "./views/Examiners.vue";



Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/admin-dashboard",
      name: "admin-dasboard",
      component: AdminDashboard
    },
    {
      path: "/departments",
      name: "departments",
      component: Departments
    },
    {
      path: "/student_view",
      name: "studentview",
      component: StudentDetails
    },
    {
      path: "/examiners",
      name: "examiners",
      component: Examiners
    },
  ]
});
