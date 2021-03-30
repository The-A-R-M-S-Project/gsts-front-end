import axiosInstance from "../axios_setup";

const state = {
    programs: [],
    fetchProgramsError: null,
    isLoading: false,
    loginError: null,
    forgotStaffPasswordError: null,
    forgotStudentPasswordError: null,
    signupError: null,
    resetStaffPassword: false,
    resetStudentPassword: false,
    resetPasswordError: null,
    resetEmail: null,
    isLoggedIn: false,
    logoutError: null,
    secretarySchool: {},
    user: {},
    loggedInUserError: null
};
const mutations = {
    setPrograms(state, payload) {
        state.programs = payload
    },
    setProgramsError(state, payload) {
        state.fetchProgramsError = payload
    },
    toggleStaffResetMessage(state, payload) {
        state.resetStaffPassword = payload;
    },
    toggleStudentResetMessage(state, payload) {
        state.resetStudentPassword = payload;
    },
    setResetEmail(state, payload) {
        state.resetEmail = payload.email;
    },
    isLoading(state, payload) {
        state.isLoading = payload;
    },
    LoginError(state, error) {
        state.loginError = error;
        state.isLoggedIn = false;
    },
    SetUser(state, payload) {
        state.user = payload;
        state.isLoggedIn = true;
    },
    SignupError(state, error) {
        state.signupError = error;
        state.isLoggedIn = false;
    },
    SetSecretarySchool(state, payload) {
        state.secretarySchool = payload
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
    resetPasswordError(state, error) {
        state.resetPasswordError = error;
    },
    fetchLoggedInUserError(state, error) {
        state.loggedInUserError = error
    }
};
const actions = {
    async fetchPrograms({commit}) {
        try {
            let response = await axiosInstance.get("/program")
            commit("setPrograms", response.data.programs)
        } catch (error) {
            commit("setProgramsError", error.response.data.message)
        }
    },
    async login({
        commit
    }, data) {
        commit("isLoading", true);
        try {
            let response = await axiosInstance.post(`/${
                data.user
            }/login`, data.credentials)
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
            localStorage.setItem("jwt", response.data.token);
            commit("SetUser", response.data.data.user);
            commit("isLoading", false);
        } catch (error) {
            commit("isLoading", false);
            commit("LoginError", error.response.data.message);
        }
    },
    async requestStaffResetLink({
        commit
    }, data) {
        commit("isLoading", true);
        commit("setResetEmail", data);
        try {
            let response = await axiosInstance.post("/staff/forgotPassword", data)
            if (response.data.status == "success") {
                commit("toggleStaffResetMessage", true);
                commit("isLoading", false);
            }
        } catch (error) {
            commit("isLoading", false);
            commit("forgotStaffPasswordError", error.response.data.message);
        }
    },
    async requestStudentResetLink({
        commit
    }, data) {
        commit("isLoading", true);
        commit("setResetEmail", data);
        try {
            await axiosInstance.post("/student/forgotPassword", data)
            commit("toggleStudentResetMessage", true);
            commit("isLoading", false);
        } catch (error) {
            commit("isLoading", false);
            commit("forgotStudentPasswordError", error.response.data.message);
        }
    },
    async resetPassword({
        commit
    }, data) {
        commit("isLoading", true);
        try {
            let response = await axiosInstance.patch(`/${
                data.role
            }/resetPassword/${
                data.resetToken
            }`, data.passwords)
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
            localStorage.setItem("jwt", response.data.token);
            commit("SetUser", response.data.data.user);
            commit("isLoading", false);
        } catch (error) {
            commit("isLoading", false);
            commit("resetPasswordError", error.response.data.message);
        }
    },
    async register({
        commit
    }, data) {
        commit("isLoading", true);
        try {
            let response = await axiosInstance.post("/student/signup", data)
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
            localStorage.setItem("jwt", response.data.token);
            commit("SetUser", response.data.data.user);
            commit("isLoading", false);
        } catch (error) {
            commit("isLoading", false);
            commit("SignupError", error.response.data.message);
        }
    },
    async fetchLoggedInStaff({commit}) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.get("/staff/me")
            commit("SetUser", response.data);
        } catch (error) {
            commit("fetchLoggedInUserError", error.response.data.message)
        }
    },
    async fetchSecretarySchool({
        commit
    }, data) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.get(`/staff/secretary/${data}`)
            commit("SetSecretarySchool", response.data.schoolOfDean)
        } catch (error) {
            commit("fetchLoggedInUserError", error.response.data.message)
        }
    },
    async fetchLoggedInStudent({commit}) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.get("/student/me")
            commit("SetUser", response.data);
        } catch (error) {
            commit("fetchLoggedInUserError", error.response.data.message)
        }
    },
    async logout({commit}) {
        commit("isLoading", true);
        if (localStorage.getItem("jwt") != null) {
            const role = ["principal", "dean", "examiner"].includes(localStorage.getItem("user").role) ? "lecturer" : "student";
            try {
                await axiosInstance.get(`/${role}/logout`)
                localStorage.removeItem("jwt");
                localStorage.removeItem("user");
                commit("isLoading", false);
            } catch (error) {
                commit("isLoading", false);
                commit("LogoutError", error.response.data.message);
            }
        }
    },
    resetStaffToggle({
        commit
    }, data) {
        commit("toggleStaffResetMessage", data);
    },
    resetStudentToggle({
        commit
    }, data) {
        commit("toggleStudentResetMessage", data);
    }
};
const getters = {
    programs: (state) => state.programs,
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    secretarySchool: (state) => state.secretarySchool,
    isLoading: (state) => state.isLoading,
    loginError: (state) => state.loginError,
    signupError: (state) => state.signupError,
    resetStaffPassword: (state) => state.resetStaffPassword,
    resetStudentPassword: (state) => state.resetStudentPassword,
    resetEmail: (state) => state.resetEmail,
    forgotStaffPasswordError: (state) => state.forgotStaffPasswordError,
    forgotStudentPasswordError: (state) => state.forgotStudentPasswordError,
    resetPasswordError: (state) => state.resetPasswordError
};

export default {state, mutations, actions, getters};
