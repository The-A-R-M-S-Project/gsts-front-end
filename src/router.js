import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import AdminDashboard from "./views/AdminDashboard.vue";
import DummyStudentDashboard from "./views/DummyStudentDashboard.vue";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "login",
			component: Login,
			meta: {
				guest: true
			}
		},
		{
			path: "/register",
			name: "register",
			component: Register,
			meta: {
				guest: true
			}
		},
		{
			path: "/student-dashboard",
			name: "student-dasboard",
			component: DummyStudentDashboard,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/admin-dashboard",
			name: "admin-dasboard",
			component: AdminDashboard,
			meta: {
				requiresAuth: true,
				is_Admin: true
			}
		}
	]
});
