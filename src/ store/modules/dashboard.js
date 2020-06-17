import axiosInstance from "../axios_setup";

const state = {
    schools: null,
    departments: null,
    selectedSchoolID: "",
    vivaStats: null,
    reportStats: null,
    performanceStats: null,
    fetchSchoolsError: null,
    fetchDepartmentsError: null,
    fetchDashboardStatsError: "",
    sessionExpired: false,
    loader: false,
};
const mutations = {
    setSchoolsList(state, payload) {
        state.schools = payload;
    },
    setDepartmentsList(state, payload) {
        state.departments = payload;
    },
    setDashboardStats(state, payload) {
        state.vivaStats = payload.vivaStatus;
        state.reportStats = payload.reportStatus;
        state.performanceStats = payload.performance;
    },
    setFetchSchoolsError(state, payload) {
        state.fetchSchoolsError = payload;
    },
    setFetchDepartmentsError(state, payload) {
        state.fetchDepartmentsError = payload;
    },
    selectedSchoolID(state, payload) {
        state.selectedSchoolID = payload;
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
                commit("setSchoolsList", response.data);
            })
            .catch((error) => {
                commit("setFetchSchoolsError", error.response.data.message);
            });
    },
    async fetchDepartments({ commit }, data) {
        await axiosInstance
            .get(`/school/${data}/department`)
            .then((response) => {
                commit("setDepartmentsList", response.data.departments);
            })
            .catch((error) => {
                commit("setFetchDepartmentsError", error.response.data.message);
            });
    },
    async fetchDashboardStats({ commit }, data) {
        commit("setLoader", true);
        commit("selectedSchoolID", data);
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${accessToken}`;
        await axiosInstance
            .get(`/staff/dashboard-stats/${data}`)
            .then((response) => {
                commit("setDashboardStats", response.data.data);
                commit("setSessionExpired", false);
                commit("setLoader", false);
            })
            .catch((error) => {
                if (
                    error.response.data.message.includes("token has expired!")
                ) {
                    commit("setSessionExpired", true);
                } else {
                    commit("setSessionExpired", false);
                }
                commit(
                    "setFetchDashboardStatsError",
                    error.response.data.message
                );
                commit("setLoader", false);
            });
    },
    async fetchDeanDashboardStats({ commit }) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${accessToken}`;
        await axiosInstance
            .get("/staff/dashboard-stats/")
            .then((response) => {
                console.log("Dean dashboard: ", response.data.data);
                commit("setDashboardStats", response.data.data);
                commit("setSessionExpired", false);
            })
            .catch((error) => {
                console.log("Dean dash: ", error.response.data.message);
                if (
                    error.response.data.message.includes("token has expired!")
                ) {
                    commit("setSessionExpired", true);
                } else {
                    commit("setSessionExpired", false);
                }
                commit(
                    "setFetchDashboardStatsError",
                    error.response.data.message
                );
            });
    },
};
const getters = {
    schools: (state) => state.schools,
    departments: (state) => state.departments,
    selectedSchoolID: (state) => state.selectedSchoolID,
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
