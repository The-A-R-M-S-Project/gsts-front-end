import axiosInstance from "../axios_setup";

const state = {
    schools: null,
    vivaStats: null,
    reportStats: null,
    performanceStats: null,
    fetchSchoolsError: null,
    fetchDashboardStatsError: "",
    sessionExpired: false,
    loader: false,
};
const mutations = {
    setSchoolsList(state, payload) {
        state.schools = payload;
    },
    setDashboardStats(state, payload) {
        state.vivaStats = payload.vivaStatus;
        state.reportStats = payload.reportStatus;
        state.performanceStats = payload.performance;
    },
    setFetchSchoolsError(state, payload) {
        state.fetchSchoolsError = payload;
    },
    setFetchDashboardStatsError(state, payload) {
        state.fetchDashboardStatsError = payload;
    },
    setLoader(state, payload) {
        state.loader = payload;
    },
    setSessionExpired(state, payload) {
        state.sessionExpired = payload;
    },
};
const actions = {
    async fetchSchools({ commit }) {
        await axiosInstance
            .get("/school/")
            .then((response) => {
                console.log("List of schools response: ", response.data);
                commit("setSchoolsList", response.data);
            })
            .catch((error) => {
                commit("setFetchSchoolsError", error.response.data.message);
            });
    },
    async fetchDashboardStats({ commit }, data) {
        commit("setLoader", true);
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${accessToken}`;
        await axiosInstance
            .get(`/staff/dashboard-stats/${data}`)
            .then((response) => {
                console.log("Stats response: ", response.data.data);
                commit("setDashboardStats", response.data.data);
                commit("setLoader", false);
            })
            .catch((error) => {
                if (
                    error.response.data.message.includes("token has expired!")
                ) {
                    console.log("session expired: ", true);
                    commit("setSessionExpired", true);
                } else {
                    console.log("session expired: ", false);
                    commit("setSessionExpired", false);
                }
                commit(
                    "setFetchDashboardStatsError",
                    error.response.data.message
                );
                commit("setLoader", false);
            });
    },
};
const getters = {
    schools: (state) => state.schools,
    vivaStats: (state) => state.vivaStats,
    reportStats: (state) => state.reportStats,
    performanceStats: (state) => state.performanceStats,
    loader: (state) => state.loader,
    sessionExpired: (state) => state.sessionExpired,
    fetchDashboardStatsError: (state) => state.fetchDashboardStatsError,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
