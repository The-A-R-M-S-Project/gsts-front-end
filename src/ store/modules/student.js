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
}
const mutations = {
    setDetailLoader(state, payload) {
        state.detailLoading = payload
    },
    setLoggedInStudentDetails(state, payload) {
        state.student = payload
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
}
const actions = {
    async setStudentDetails({
        commit
    }, data) {
        commit("setDetailLoader", true)
        await axiosInstance.get(`/student/${
            data.student._id
        }`).then(response => {
            commit("studentDetails", response.data)
            commit("setDetailLoader", false)
        }).catch(error => {
            commit("setDetailLoader", false)
            commit("fetchStudentDetailsError", error.response.data.message)
        })
    },
    async fetchLoggedInStudentDetails({commit}) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        commit("setOverlayLoader", true);
        await axiosInstance.get("/student/me").then(response => {
            commit("setLoggedInStudentDetails", response.data)
            commit("setOverlayLoader", false);
        }).catch(error => {
            commit("setOverlayLoader", false);
            commit("fetchStudentDashboardError", error.response.data.message)
        })
    },
    async createReport({
        commit
    }, data) {
        commit("setDetailLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.post("/student/report", data).then(response => {
            commit("addNewReport", response.data.message)
            commit("changeReportSectionKey")
            commit("setDetailLoader", false)
        }).catch(error => {
            commit("setDetailLoader", false)
            commit("setReportError", error.response.data.message)
        })
    },
    async editReport({
        commit
    }, data) {
        commit("setDetailLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.patch("/student/report", data).then(response => {
            commit("addNewReport", response.data.message)
            commit("setDetailLoader", false)
        }).catch(error => {
            commit("setDetailLoader", false)
            commit("setReportError", error.response.data.message)
        })
    },
    async submitFinalReport({
        commit
    }, data) {
        commit("setReportSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.patch("/student/report/submit", data).then(response => {
            commit("submitReport", response.data.message)
            commit("setReportSubmitLoader", false)
        }).catch(error => {
            commit("setReportSubmitLoader", false)
            commit("setReportSubmitError", error.response.data.message)
        })
    }
}
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
    reportSubmitError: (state) => state.reportSubmitError
}
export default {state, mutations, actions, getters};
