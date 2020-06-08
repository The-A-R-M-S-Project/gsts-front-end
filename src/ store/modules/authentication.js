import axiosInstance from "../axios_setup";
import { register } from "register-service-worker";

const state = {
    isLoading: false,
    loginError: null,
    logoutLoading: false,
    forgotStaffPasswordError: null,
    forgotStudentPasswordError: null,
    signupError: null,
    resetStaffPassword: false,
    resetStudentPassword: false,
    resetStaffPasswordError: false,
    resetEmail: null,
    isLoggedIn: false,
    logoutError: null,
    user: {},
};
const mutations = {
    toggleStaffResetMessage(state, payload) {
        state.resetStaffPassword = payload;
    },
    toggleStudentResetMessage(state, payload) {
        state.resetStudentPassword = payload;
    },
    setResetEmail(state, payload) {
        state.resetEmail = payload.email;
    },
    IsLoading(state, payload) {
        state.isLoading = payload;
    },
    logoutLoading(state, payload) {
        state.logoutLoading = payload;
    },
    LoginError(state, error) {
        state.loginError = error;
    },
    SetUser(state, payload) {
        state.user = payload;
        state.isLoggedIn = true;
    },
    SignupError(state, error) {
        state.signupError = error;
    },
    LogoutError(state, error) {
        state.logoutError = error;
    },
    forgotStaffPasswordError(state, error) {
        state.forgotStaffPasswordError = error;
    },
    forgotStudentPasswordError(state, error) {
        state.forgotStudentPasswordError = error;
    },
    resetStaffPasswordError(state, error) {
        state.resetStaffPasswordError = error;
    },
};
const actions = {
    async login({ commit }, data) {
        commit("IsLoading", true);
        await axiosInstance
            .post(`/${data.user}/login`, data.credentials)
            .then((response) => {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data.user)
                );
                localStorage.setItem("jwt", response.data.token);
                commit("SetUser", response.data.data.user);
                commit("IsLoading", false);
            })
            .catch((error) => {
                commit("IsLoading", false);
                commit("LoginError", error.response.data.message);
            });
    },
    async requestStaffResetLink({ commit }, data) {
        commit("IsLoading", true);
        commit("setResetEmail", data);
        await axiosInstance
            .post("/staff/forgotPassword", data)
            .then((response) => {
                if (response.data.status == "success") {
                    commit("toggleStaffResetMessage", true);
                    commit("IsLoading", false);
                }
            })
            .catch((error) => {
                commit("IsLoading", false);
                commit("forgotStaffPasswordError", error.response.data.message);
            });
    },
    async requestStudentResetLink({ commit }, data) {
        commit("IsLoading", true);
        commit("setResetEmail", data);
        await axiosInstance
            .post("/student/forgotPassword", data)
            .then((response) => {
                if (response.data.status == "success") {
                    commit("toggleStudentResetMessage", true);
                    commit("IsLoading", false);
                }
            })
            .catch((error) => {
                commit("IsLoading", false);
                commit(
                    "forgotStudentPasswordError",
                    error.response.data.message
                );
            });
    },
    async resetStaffPassword({ commit }, data) {
        commit("IsLoading", true);
        await axiosInstance
            .patch(`/staff/resetPassword/${data.resetToken}`, data.passwords)
            .then((response) => {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data.user)
                );
                localStorage.setItem("jwt", response.data.token);
                commit("SetUser", response.data.data.user);
                commit("IsLoading", false);
            })
            .catch((error) => {
                commit("IsLoading", false);
                commit("resetStaffPasswordError", error.response.data.message);
            });
    },
    async register({ commit }, data) {
        commit("IsLoading", true);
        await axiosInstance
            .post("/student/signup", data)
            .then((response) => {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data.user)
                );
                localStorage.setItem("jwt", response.data.token);
                commit("SetUser", response.data.data.user);
                commit("IsLoading", false);
            })
            .catch((error) => {
                commit("IsLoading", false);
                commit("SignupError", error.response.data.message);
            });
    },
    async logout({ commit }) {
        commit("logoutLoading", true);
        if (localStorage.getItem("jwt") != null) {
            const role = ["principal", "dean", "examiner"].includes(
                localStorage.getItem("user").role
            )
                ? "lecturer"
                : "student";
            commit("logoutLoading", true);
            await axiosInstance
                .get(`/${role}/logout`)
                .then((response) => {
                    localStorage.removeItem("jwt");
                    localStorage.removeItem("user");
                    response();
                    commit("logoutLoading", false);
                })
                .catch((error) => {
                    commit("logoutLoading", false);
                    commit("LogoutError", error);
                });
        }
    },
    resetToggle({ commit }, data) {
        commit("toggleStaffResetMessage", data);
    },
};
const getters = {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    isLoading: (state) => state.isLoading,
    loginError: (state) => state.loginError,
    signupError: (state) => state.signupError,
    resetStaffPassword: (state) => state.resetStaffPassword,
    resetStudentPassword: (state) => state.resetStudentPassword,
    resetEmail: (state) => state.resetEmail,
    forgotStaffPasswordError: (state) => state.forgotStaffPasswordError,
    forgotStudentPasswordError: (state) => state.forgotStudentPasswordError,
    resetStaffPasswordError: (state) => state.resetStaffPasswordError,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
