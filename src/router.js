import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import PrincipalDashboard from "./views/PrincipalDashboard.vue";
import DummyStudentDashboard from "./views/DummyStudentDashboard.vue";
import DummyDeanDashboard from "./views/DummyDeanDashboard.vue";
import DummyExaminerDashboard from "./views/DummyExaminerDashboard.vue";

Vue.use(Router);

let router = new Router({
	mode: "history",
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
				requiresAuth: true,
				is_student: true
			}
		},
		{
			path: "/examiner-dashboard",
			name: "examiner-dasboard",
			component: DummyExaminerDashboard,
			meta: {
				requiresAuth: true,
				is_examiner: true
			}
		},
		{
			path: "/dean-dashboard",
			name: "dean-dasboard",
			component: DummyDeanDashboard,
			meta: {
				requiresAuth: true,
				is_dean: true
			}
		},
		{
			path: "/principal-dashboard",
			name: "principal-dasboard",
			component: PrincipalDashboard,
			meta: {
				requiresAuth: true,
				is_principal: true
			}
		}
	]
});

export default router;
