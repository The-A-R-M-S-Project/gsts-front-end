import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
function lazyLoad(view) {
    return() => import (`@/views/${view}.vue`)
}

let router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "login",
            component: lazyLoad('Login'),
            meta: {
                guest: true
            }
        },
        {
            path: "/forgot-staff-password",
            name: "forgot-staff-password",
            component: lazyLoad('ForgotStaffPass'),
            meta: {
                guest: true
            }
        },
        {
            path: "/forgot-student-password",
            name: "forgot-student-password",
            component: lazyLoad('ForgotStudentPass'),
            meta: {
                guest: true
            }
        },
        {
            path: "/:role/secret/edit",
            name: "reset-password",
            component: lazyLoad('ResetPassword'),
            meta: {
                guest: true
            }
        }, {
            path: "/register",
            name: "register",
            component: lazyLoad('Register'),
            meta: {
                guest: true
            }
        }, {
            path: "/student-dashboard",
            name: "student-dashboard",
            component: lazyLoad('StudentDashboard'),
            redirect: "/student-dashboard/report-status",
            meta: {
                requiresAuth: true,
                is_student: true
            },
            children: [
                {
                    path: "submit-report",
                    name: "submit-report",
                    component: lazyLoad('StudentSubmission')
                }, {
                    path: "report-status",
                    name: "report-status",
                    component: lazyLoad('StudentActivity')
                }, {
                    path: "student-profile",
                    name: "studentProfile",
                    component: lazyLoad('StudentProfile')
                },
            ]
        },, {
            path: "/examiner-dashboard",
            name: "examiner-dashboard",
            component: lazyLoad('ExaminerDashboard'),
            meta: {
                requiresAuth: true,
                is_examiner: true
            }
        }, {
            path: "/secretary-dashboard",
            name: "secretary-dashboard",
            component: lazyLoad('DeanSecretaryDashboard'),
            meta: {
                requiresAuth: true,
                is_dean: true
            }
        }, {
            path: "/dean-dashboard",
            name: "dean-dashboard",
            component: lazyLoad('DeanDashboard'),
            meta: {
                requiresAuth: true,
                is_dean: true
            }
        }, {
            path: "/principal-dashboard",
            name: "principal-dashboard",
            component: lazyLoad('PrincipalDashboard'),
            meta: {
                requiresAuth: true,
                is_principal: true
            }
        }, {
            path: "/student-progress/:studentID",
            name: "student-progress",
            component: lazyLoad('PrincipalStudentDashboard'),
            meta: {
                requiresAuth: true,
                is_principal: true,
                is_dean: true,
                is_examiner: true
            }
        }, {
            path: "/student-report/:examinerAssessmentID",
            name: "student-report",
            component: lazyLoad('ExaminerStudentReport'),
            meta: {
                requiresAuth: true,
                is_examiner: true
            }
        }, {
            path: "/:role/profile",
            name: "elevated-staff-profile",
            component: lazyLoad('StaffProfile'),
            meta: {
                requiresAuth: true,
                is_principal: true,
                is_dean: true
            }
        }, {
            path: "/ECE-dashboard",
            name: "ece-dashboard",
            component: lazyLoad('ECEDashboard'),
            meta: {
                requiresAuth: true,
                is_principal: true
            }
        }, {
            path: "/BE-dashboard",
            name: "be-dashboard",
            component: lazyLoad('BEDashboard'),
            meta: {
                requiresAuth: true,
                is_principal: true
            }
        }, {
            path: "/FA-dashboard",
            name: "fa-dashboard",
            component: lazyLoad('FADashboard'),
            meta: {
                requiresAuth: true,
                is_principal: true
            }
        }, {
            path: "/students",
            name: "students",
            component: lazyLoad('Students'),
            meta: {
                requiresAuth: true,
                is_principal: true,
                is_dean: true
            }
        }, {
            path: "/examiners",
            name: "examiners",
            component: lazyLoad('Examiners'),
            meta: {
                requiresAuth: true,
                is_principal: true,
                is_dean: true
            }
        }, {
            path: "/expired-session",
            name: "expired-session",
            component: lazyLoad('ExpiredSession'),
            meta: {
                requiresAuth: true
            }
        }, {
            path: "/under-construction",
            name: "under-construction",
            component: lazyLoad('UnderConstruction')
        }, {
            path: "*",
            component: lazyLoad('PageNotFound')
        },
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (localStorage.getItem("jwt") == null) {
            next({
                path: "/",
                params: {
                    continue: to.fullPath
                }
            });
        } else {
            let user = JSON.parse(localStorage.getItem("user"));
            if (to.matched.some((record) => record.meta.is_principal) && user.role === "principal") {
                next();
            } else if (to.matched.some((record) => record.meta.is_dean) && user.role === "dean") {
                next();
            } else if (to.matched.some((record) => record.meta.is_student) && user.role === "student") {
                next();
            } else if (to.matched.some((record) => record.meta.is_examiner) && user.role === "examiner") {
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
            next({name: `${userRole}-dashboard`});
        }
    } else {
        next();
        return;
    }
});

export default router;
