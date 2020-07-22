import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import ForgotStaffPass from "./views/ForgotStaffPass.vue";
import ForgotStudentPass from "./views/ForgotStudentPass.vue";
import ResetPassword from "./views/ResetPassword.vue";
import Register from "./views/Register.vue";
import Students from "./views/Students.vue";
import StudentDetails from "./views/AdminStudentView.vue";
import Examiners from "./views/Examiners.vue";
import ExaminersDetails from "./views/ExaminerDetails.vue";
import ECEDashboard from "./views/ECEDashboard.vue";
import FADashboard from "./views/FADashboard.vue";
import PrincipalDashboard from "./views/PrincipalDashboard";
import StudentDashboard from "./views/StudentDashboard.vue";
import DeanDashboard from "./views/DeanDashboard.vue";
import ExaminerDashboard from "./views/ExaminerDashboard.vue";
import ReportStatus from "./components/StudentTimeline.vue";
import StudentProfile from "./components/StudentProfile.vue";
import ExpiredSession from "./views/ExpiredSession.vue";
import UnderConstruction from "./views/UnderConstruction.vue";
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
            component: DeanDashboard,
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
            // meta: {
            //     requiresAuth: true,
            //     is_principal: true,
            // },
        },
        {
            path: "/BE-dashboard",
            name: "be-dashboard",
            component: ECEDashboard,
            meta: {
                requiresAuth: true,
                is_principal: true,
            },
        },
        {
            path: "/FA-dashboard",
            name: "fa-dashboard",
            component: FADashboard,
            meta: {
                requiresAuth: true,
                is_principal: true,
            },
        },
        {
            path: "/students",
            name: "students",
            component: Students,
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
        {
            path: "/expired-session",
            name: "expired-session",
            component: ExpiredSession,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/under-construction",
            name: "under-construction",
            component: UnderConstruction,
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
            if (
                to.matched.some((record) => record.meta.is_principal) &&
                user.role === "principal"
            ) {
                next();
            } else if (
                to.matched.some((record) => record.meta.is_dean) &&
                user.role === "dean"
            ) {
                next();
            } else if (
                to.matched.some((record) => record.meta.is_student) &&
                user.role === "student"
            ) {
                next();
            } else if (
                to.matched.some((record) => record.meta.is_examiner) &&
                user.role === "examiner"
            ) {
                next();
            } else {
                next();
                return;
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
        return;
    }
});

export default router;
