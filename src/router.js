import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Departments from "./views/Departments.vue";
import StudentDetails from "./views/AdminStudentView.vue";
import Examiners from "./views/Examiners.vue";
import ExaminersDetails from "./views/ExaminerDetails.vue"
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
			name: "student-dashboard",
			component: DummyStudentDashboard,
			meta: {
				requiresAuth: true,
				is_student: true
			}
		},
		{
			path: "/examiner-dashboard",
			name: "examiner-dashboard",
			component: DummyExaminerDashboard,
			meta: {
				requiresAuth: true,
				is_examiner: true
			}
		},
		{
			path: "/dean-dashboard",
			name: "dean-dashboard",
			component: DummyDeanDashboard,
			meta: {
				requiresAuth: true,
				is_dean: true
			}
		},
		{
			path: "/principal-dashboard",
			name: "principal-dashboard",
			component: PrincipalDashboard,
			meta: {
				requiresAuth: true,
				is_principal: true
			}
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
    {
      path: "/examinersdetails",
      name: "examinersDetails",
      component: ExaminersDetails
    },
  ]
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (localStorage.getItem("jwt") == null) {
			next({
				path: "/",
				params: { continue: to.fullPath }
			});
		} else {
			let user = JSON.parse(localStorage.getItem("user"));
			if (to.matched.some(record => record.meta.is_principal)) {
				if (user.role === "principal") {
					next();
				} else {
					next({ name: `${user.role}-dashboard` });
				}
			} else if (to.matched.some(record => record.meta.is_dean)) {
				if (user.role === "dean") {
					next();
				} else {
					next({ name: `${user.role}-dashboard` });
				}
			} else if (to.matched.some(record => record.meta.is_student)) {
				if (user.role === "student") {
					next();
				} else {
					next({ name: `${user.role}-dashboard` });
				}
			}
		}
	} else if (to.matched.some(record => record.meta.guest)) {
		if (localStorage.getItem("jwt") == null) {
			next();
		} else {
			const userRole = JSON.parse(localStorage.getItem("user")).role;
			next({
				name: `${userRole}-dashboard`
			});
		}
	} else {
		next();
	}
});

export default router;
