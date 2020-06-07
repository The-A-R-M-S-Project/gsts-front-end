import axiosInstance from "../axios_setup";
import { register } from "register-service-worker";

const state = {
    isLoading: false,
    loginError: null,
    logoutLoading: false,
    ForgotStaffPasswordError: null,
    signupError: null,
    ResetStaffPassword: false,
    ResetStaffPasswordError: false,
    resetEmail: null,
    isLoggedIn: false,
    logoutError: null,
    user: {},
};
const mutations = {
    toggleResetStaffPasswordMessage(state, payload) {
        state.ResetStaffPassword = payload;
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
    ForgotStaffPasswordError(state, error) {
        state.ForgotStaffPasswordError = error;
    },
    ResetStaffPasswordError(state, error) {
        state.ResetStaffPasswordError = error;
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
    async requestResetLink({ commit }, data) {
        commit("IsLoading", true);
        commit("setResetEmail", data);
        await axiosInstance
            .post("/staff/forgotPassword", data)
            .then((response) => {
                if (response.data.status == "success") {
                    commit("toggleResetStaffPasswordMessage", true);
                    commit("IsLoading", false);
                }
            })
            .catch((error) => {
                commit("IsLoading", false);
                commit("ForgotStaffPasswordError", error.response.data.message);
            });
    },
    async ResetStaffPassword({ commit }, data) {
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
                commit("ResetStaffPasswordError", error.response.data.message);
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
};
const getters = {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    isLoading: (state) => state.isLoading,
    loginError: (state) => state.loginError,
    signupError: (state) => state.signupError,
    ResetStaffPassword: (state) => state.ResetStaffPassword,
    resetEmail: (state) => state.resetEmail,
    ForgotStaffPasswordError: (state) => state.ForgotStaffPasswordError,
    ResetStaffPasswordError: (state) => state.ResetStaffPasswordError,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
