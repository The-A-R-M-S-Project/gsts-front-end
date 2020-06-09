import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import ForgotStaffPass from "./views/ForgotStaffPass.vue";
import ForgotStudentPass from "./views/ForgotStudentPass.vue";
import ResetPassword from "./views/ResetPassword.vue";
import Register from "./views/Register.vue";
import Departments from "./views/Departments.vue";
import StudentDetails from "./views/AdminStudentView.vue";
import Examiners from "./views/Examiners.vue";
import ExaminersDetails from "./views/ExaminerDetails.vue";
import ECEDashboard from "./views/ECEDashboard.vue";
import PrincipalDashboard from "./views/PrincipalDashboard";
import StudentDashboard from "./views/StudentDashboard.vue";
import DeanSEDashboard from "./views/EngDeanDashboard.vue";
import ExaminerDashboard from "./views/ExaminerDashboard.vue";
import ReportStatus from "./components/StudentTimeline.vue";
import StudentProfile from "./components/StudentProfile.vue";
import PageNotFound from "./components/PageNotFound.vue";

Vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "login",
            component: Login,
            meta: {
                guest: true,
            },
        },
        {
            path: "/forgot-staff-password",
            name: "forgot-staff-password",
            component: ForgotStaffPass,
            meta: {
                guest: true,
            },
        },
        {
            path: "/forgot-student-password",
            name: "forgot-student-password",
            component: ForgotStudentPass,
            meta: {
                guest: true,
            },
        },
        {
            path: "/:role/secret/edit",
            name: "reset-password",
            component: ResetPassword,
            meta: {
                guest: true,
            },
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                guest: true,
            },
        },
        {
            path: "/student-dashboard",
            name: "student-dashboard",
            redirect: "/student-dashboard/report-status",
            component: StudentDashboard,
            meta: {
                requiresAuth: true,
                is_student: true,
            },
            children: [
                {
                    path: "report-status",
                    name: "report-status",
                    component: ReportStatus,
                },
                {
                    path: "student-profile",
                    name: "studentProfile",
                    component: StudentProfile,
                },
            ],
        },
        {
            path: "/examiner-dashboard",
            name: "examiner-dashboard",
            component: ExaminerDashboard,
            meta: {
                requiresAuth: true,
                is_examiner: true,
            },
        },
        {
            path: "/dean-dashboard",
            name: "dean-dashboard",
            component: DeanSEDashboard,
            meta: {
                requiresAuth: true,
                is_dean: true,
            },
        },
        {
            path: "/principal-dashboard",
            name: "principal-dashboard",
            component: PrincipalDashboard,
            meta: {
                requiresAuth: true,
                is_principal: true,
            },
        },
        {
            path: "/ECE-dashboard",
            name: "ece-dashboard",
            component: ECEDashboard,
            meta: {
                requiresAuth: true,
                is_principal: true,
            },
        },
        {
            path: "/departments",
            name: "departments",
            component: Departments,
            meta: {
                requiresAuth: true,
                is_principal: true,
                is_dean: true,
            },
        },
        {
            path: "/student_view",
            name: "studentview",
            component: StudentDetails,
            meta: {
                requiresAuth: true,
                is_principal: true,
                is_dean: true,
            },
        },
        {
            path: "/examiners",
            name: "examiners",
            component: Examiners,
            meta: {
                requiresAuth: true,
                is_principal: true,
                is_dean: true,
            },
        },
        {
            path: "/examinersdetails",
            name: "examinersDetails",
            component: ExaminersDetails,
            meta: {
                requiresAuth: true,
                is_principal: true,
                is_dean: true,
            },
        },
        { path: "*", component: PageNotFound },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (localStorage.getItem("jwt") == null) {
            next({
                path: "/",
                params: { continue: to.fullPath },
            });
        } else {
            let user = JSON.parse(localStorage.getItem("user"));
            if (to.matched.some((record) => record.meta.is_principal)) {
                if (user.role === "principal") {
                    next();
                } else {
                    next({ name: `${user.role}-dashboard` });
                }
            } else if (to.matched.some((record) => record.meta.is_dean)) {
                if (user.role === "dean") {
                    next();
                } else {
                    next({ name: `${user.role}-dashboard` });
                }
            } else if (to.matched.some((record) => record.meta.is_student)) {
                if (user.role === "student") {
                    next();
                } else {
                    next({ name: `${user.role}-dashboard/report-status` });
                }
            } else if (to.matched.some((record) => record.meta.is_examiner)) {
                if (user.role === "examiner") {
                    next();
                } else {
                    next({ name: `${user.role}-dashboard` });
                }
            }
        }
    } else if (to.matched.some((record) => record.meta.guest)) {
        if (localStorage.getItem("jwt") == null) {
            next();
        } else {
            const userRole = JSON.parse(localStorage.getItem("user")).role;
            next({
                name: `${userRole}-dashboard`,
            });
        }
    } else {
        next();
    }
});

export default router;
