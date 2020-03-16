import axiosInstance from "../axios_setup";

const state = {
    isLoading: false,
    loginError: null,
    isLoggedIn: false,
    user: {}
};
const mutations = {
    IsLoading(state, payload) {
        state.isLoading = payload;
    },
    LoginError(state, error) {
        state.loginError = error;
    },
    SetUser(state, payload) {
        state.user = payload;
        state.isLoggedIn = true;
    }
};
const actions = {
    async login({ commit }, data) {
        commit("IsLoading", true);
        await axiosInstance
            .post(`/${data.user}/login`, data.credentials)
            .then(response => {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data.user)
                );
                localStorage.setItem("jwt", response.data.token);
                commit("SetUser", response.data.data.user);
                commit("IsLoading", false);
            })
            .catch(error => {
                commit("IsLoading", false);
                commit("LoginError", error.response.data.message);
            });
    }
};
const getters = {
    isLoggedIn: state => state.isLoggedIn,
    user: state => state.user,
    isLoading: state => state.isLoading,
    loginError: state => state.loginError
};

export default {
    state,
    mutations,
    actions,
    getters
};
