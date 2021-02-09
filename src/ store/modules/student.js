import axiosInstance from "../axios_setup";

const state = {
    student: {},
    detailLoading: false,
    reportActionMessage: '',
    reportSubmitMessage: '',
    studentReportError: null,
    reportSubmitError: null,
    studentDashboardError: null,
    submitReportLoading: false,
    reportSectionKey: 0
};
const mutations = {
    setDetailLoader(state, payload) {
        state.detailLoading = payload
    },
    setLoggedInStudentDetails(state, payload) {
        state.user = payload;
        state.student = payload
    },
    setStudentReport(state, payload) {
        state.student.report = payload
    },
    studentDetails(state, payload) {
        state.student = payload
    },
    addNewReport(state, payload) {
        state.reportActionMessage = payload
    },
    submitReport(state, payload) {
        state.reportSubmitMessage = payload
    },
    setReportError(state, payload) {
        state.studentReportError = payload
    },
    setReportSubmitError(state, payload) {
        state.reportSubmitError = payload
    },
    fetchStudentDetailsError() {
        state.studentDetailsError = payload
    },
    fetchStudentDashboardError(state, payload) {
        state.studentDashboardError = payload
    },
    setReportSubmitLoader(state, payload) {
        state.submitReportLoading = payload
    },
    changeReportSectionKey(state) {
        state.reportSectionKey ++
    }
};
const actions = {
    async setStudentDetails({
        commit
    }, data) {
        commit("setDetailLoader", true);
        await axiosInstance.get(`/student/${
            data.student._id
        }`).then(response => {
            console.log("Response", response.data)
            commit("studentDetails", response.data);
            commit("setDetailLoader", false)
        }).catch(error => {
            commit("setDetailLoader", false);
            commit("fetchStudentDetailsError", error.response.data.message)
        })
    },
    async fetchSpecificStudentReport({
        commit
    }, data) {
        commit("setDetailLoader", true);
        await axiosInstance.get(`/report/${
            data.student._id
        }`).then(response => {
            commit("setStudentReport", response.data);
            commit("setDetailLoader", false)
        }).catch(error => {
            commit("setDetailLoader", false);
            commit("fetchStudentDetailsError", error.response.data.message)
        })
    },
    async fetchLoggedInStudentDetails({commit}) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        commit("setOverlayLoader", true);
        await axiosInstance.get("/student/me").then(response => {
            commit("setLoggedInStudentDetails", response.data);
            commit("setOverlayLoader", false);
        }).catch(error => {
            commit("setOverlayLoader", false);
            commit("fetchStudentDashboardError", error.response.data.message)
        })
    },
    async fetchStudentReport({commit}) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        commit("setOverlayLoader", true);
        try {
            let response = await axiosInstance.get("/report/student")
            commit("setStudentReport", response.data);
            commit("setOverlayLoader", false);
        } catch (error) {
            commit("setOverlayLoader", false);
            commit("fetchStudentDashboardError", error.response.data.message)
        }

    },
    async createReport({
        commit
    }, data) {
        commit("setDetailLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.post("/report", data).then(response => {
            commit("addNewReport", response.data.message);
            commit("changeReportSectionKey");
            commit("setDetailLoader", false)
        }).catch(error => {
            commit("setDetailLoader", false);
            commit("setReportError", error.response.data.message)
        })
    },
    async editReport({
        commit
    }, data) {
        commit("setDetailLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.patch("/report/student", data).then(response => {
            commit("addNewReport", response.data.message);
            commit("setDetailLoader", false)
        }).catch(error => {
            commit("setDetailLoader", false);
            commit("setReportError", error.response.data.message)
        })
    },
    async submitFinalReport({
        commit
    }, data) {
        commit("setReportSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.patch("/report/submit", data).then(response => {
            commit("submitReport", response.data.message);
            commit("setReportSubmitLoader", false)
        }).catch(error => {
            commit("setReportSubmitLoader", false);
            commit("setReportSubmitError", error.response.data.message)
        })
    }
};
const getters = {
    student: (state) => state.student,
    detailLoading: (state) => state.detailLoading,
    studentSchool: (state) => {
        return state.schools.filter((school) => {
            return school._id === state.student.school;
        })[0].name;
    },
    submitReportLoading: (state) => state.submitReportLoading,
    reportActionMessage: (state) => state.reportActionMessage,
    reportSubmitMessage: (state) => state.reportSubmitMessage,
    reportSubmitError: (state) => state.reportSubmitError,
    reportSectionKey: (state) => state.reportSectionKey
};
export default {state, mutations, actions, getters};
