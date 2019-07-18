import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Dashboard from "./views/AdminDashboard.vue";
import Departments from "./views/Departments.vue";
import StudentDetails from "./views/StudentDashboard.vue";



Vue.use(Router);

export default new Router({
  routes: [
    {
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
      path: "/dashboard",
      name: "dasboard",
      component: Dashboard
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
    }
  ]
});
