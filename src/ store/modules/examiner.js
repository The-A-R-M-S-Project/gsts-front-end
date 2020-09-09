import axiosInstance from "../axios_setup";
const state = {
    assignedStudents: [],
    fetchAssignedStudentsError: null,
    receiveReportMessage: '',
    displayReceiveReportMessage: false,
    receiveReportError: null,
    clearReportMessage: '',
    displayClearReportMessage: false,
    clearReportError: null,
    examinerStudentDetails: {}
}
const mutations = {
    setAssignedStudents(state, payload) {
        state.assignedStudents = payload
    },
    fetchAssignedStudentsError(state, payload) {
        state.fetchAssignedStudentsError = payload
    },
    receiveReportSuccess(state, payload) {
        state.receiveReportMessage = payload
        state.displayReceiveReportMessage = true
    },
    setReceiveReportError(state, payload) {
        state.receiveReportError = payload
    },
    clearReportSuccess(state, payload) {
        state.clearReportMessage = payload
        state.displayClearReportMessage = true
    },
    setClearReportError(state, payload) {
        state.clearReportError = payload
    },
    examinerStudentDetails(state, payload) {
        state.examinerStudentDetails = payload
    }
}
const actions = {
    async fetchAssignedStudents({commit}) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.get("/staff/report/").then(response => {
            commit("setAssignedStudents", response.data.reports)
        }).catch(error => {
            commit("fetchAssignedStudentsError", error.response.data.message)
        })
    },
    async receiveReport({
        commit
    }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.patch(`/staff/report/receive/${data}`).then(response => {
            commit("receiveReportSuccess", response.data.status)
            commit("setDisplayStudentTableFeedback", true)
            commit("setSubmitLoader", false)
        }).catch(error => {
            commit("setSubmitLoader", false)
            commit("setReceiveReportError", error.response.data.message)
        })
    },
    async clearStudentReport({
        commit
    }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.patch(`/staff/report/clear/${
            data.report
        }`, data.score).then(response => {
            commit("clearReportSuccess", response.data.status)
            commit("setDisplayStudentTableFeedback", true)
            commit("setSubmitLoader", false)
        }).catch(error => {
            commit("setSubmitLoader", false)
            commit("setClearReportError", error.response.data.message)
        })
    },
    setExaminerStudentDetails({
        commit
    }, data) {
        commit("examinerStudentDetails", data)
    }
}
const getters = {
    assignedStudents: (state) => state.assignedStudents,
    receiveReportMessage: (state) => state.displayReceiveReportMessage,
    clearReportMessage: (state) => state.displayClearReportMessage,
    examinerStudentDetails: (state) => state.examinerStudentDetails
}

export default {state, mutations, actions, getters};
