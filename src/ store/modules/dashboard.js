import axiosInstance from "../axios_setup";

const state = {
    schools: null,
    departments: null,
    selectedSchoolID: "",
    schoolName: "",
    vivaStats: [],
    reportStats: [],
    performanceStats: [],
    fetchSchoolsError: null,
    fetchDepartmentsError: null,
    fetchDashboardStatsError: "",
    overlayLoader: false,
    loader: false
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
    setSchoolName(state, payload) {
        state.schoolName = payload;
    },
    setOverlayLoader(state, payload) {
        state.overlayLoader = payload;
    }
};
const actions = {
    async fetchSchools({ commit }) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        commit("setOverlayLoader", true);
        try {
            let response = await axiosInstance.get("/school/")
            commit("setSchoolsList", response.data);
            commit("setOverlayLoader", false);
        } catch (error) {
            commit("setFetchSchoolsError", error.response.data.message);
            commit("setOverlayLoader", false);
        }
    },
    async fetchDepartments({
        commit
    }, data) {
        commit("setOverlayLoader", true);
        try {
            let response = await axiosInstance.get(`/school/${data}/department`)
            commit("setDepartmentsList", response.data.departments);
            commit("setOverlayLoader", false);
        } catch (error) {
            commit("setFetchDepartmentsError", error.response.data.message);
            commit("setOverlayLoader", false);
        }
    },
    async fetchDashboardStats({
        commit
    }, data) {
        commit("setLoader", true);
        commit("setOverlayLoader", true);
        commit("selectedSchoolID", data);
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.get(`/school/dashboard-stats/${data}`)
            commit("setDashboardStats", response.data.data);
            commit("setLoader", false);
            commit("setOverlayLoader", false);
        } catch (error) {
            commit("setFetchDashboardStatsError", error.response.data.message);
            commit("setLoader", false);
            commit("setOverlayLoader", false);
        }
    },
    async fetchDeanDashboardStats({commit}) {
        commit("setOverlayLoader", true);
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.get("/school/dashboard-stats/")
            commit("setDashboardStats", response.data.data);
            commit("setOverlayLoader", false);
        } catch (error) {
            commit("setFetchDashboardStatsError", error.data.message);
            commit("setOverlayLoader", false);
        }
    },
    async fetchSchoolDetails({
        commit
    }, data) {
        commit("setOverlayLoader", true);
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.get(`/school/${data}`)
            commit("setSchoolName", response.data.name);
            commit("setOverlayLoader", false);
        } catch (error) {
            commit("setFetchDashboardStatsError", error.response.data.message);
            commit("setOverlayLoader", false);
        }
    },
    toggleOverlayLoader({
        commit
    }, data) {
        commit("setOverlayLoader", data);
    }
};
const getters = {
    schools: (state) => state.schools,
    departments: (state) => state.departments,
    selectedSchoolID: (state) => state.selectedSchoolID,
    schoolName: (state) => state.schoolName,
    vivaStats: (state) => state.vivaStats,
    reportStats: (state) => state.reportStats,
    performanceStats: (state) => state.performanceStats,
    loader: (state) => state.loader,
    overlayLoader: (state) => state.overlayLoader,
    fetchDashboardStatsError: (state) => state.fetchDashboardStatsError
};

export default {state, mutations, actions, getters};
