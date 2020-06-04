import axiosInstance from "../axios_setup";
import { register } from "register-service-worker";

const state = {
    isLoading: false,
    loginError: null,
    logoutLoading: false,
    forgotPasswordError: null,
    signupError: null,
    resetPassword: false,
    resetEmail: null,
    isLoggedIn: false,
    logoutError: null,
    user: {},
};
const mutations = {
    toggleResetPasswordMessage(state, payload) {
        state.resetPassword = payload;
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
    ForgotPasswordError(state, error) {
        state.forgotPasswordError = error;
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
    async sumbitEmail({ commit }, data) {
        commit("IsLoading", true);
        commit("setResetEmail", data);
        await axiosInstance
            .post("/staff/forgotPassword", data)
            .then((response) => {
                if (response.data.status == "success") {
                    commit("toggleResetPasswordMessage", true);
                    commit("IsLoading", false);
                }
            })
            .catch((error) => {
                commit("IsLoading", false);
                commit("ForgotPasswordError", error.response.data.message);
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
    resetPassword: (state) => state.resetPassword,
    resetEmail: (state) => state.resetEmail,
    forgotPasswordError: (state) => state.forgotPasswordError,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
