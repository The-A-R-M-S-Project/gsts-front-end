import axiosInstance from "../axios_setup";
const state = {
    assignedStudents: [],
    fetchAssignedStudentsError: null,
    assignedStudentsTableMessage: '',
    receiveReportError: null,
    clearReportError: null,
    examinerStudentDetails: {},
    examinerStatisticsKey: 0
}
const mutations = {
    setAssignedStudents(state, payload) {
        state.assignedStudents = payload
    },
    fetchAssignedStudentsError(state, payload) {
        state.fetchAssignedStudentsError = payload
    },
    receiveReportSuccess(state, payload) {
        let str = payload.res
        let success = `${
            str[0].toUpperCase()
        }${
            str.slice(1)
        }`;
        state.assignedStudentsTableMessage = `${success}. You've acknowledged receipt of ${
            payload.student
        }'s report`
    },
    setReceiveReportError(state, payload) {
        state.receiveReportError = payload
    },
    clearReportSuccess(state, payload) {
        let str = payload.res
        let success = `${
            str[0].toUpperCase()
        }${
            str.slice(1)
        }`;
        state.assignedStudentsTableMessage = `${success}. You've cleared ${
            payload.student
        }'s report`
    },
    setClearReportError(state, payload) {
        state.clearReportError = payload
    },
    examinerStudentDetails(state, payload) {
        state.examinerStudentDetails = payload
    },
    changeExaminerStatisticsKey(state) {
        state.examinerStatisticsKey ++
    }
}
const actions = {
    async fetchAssignedStudents({commit}) {
        commit("setOverlayLoader", true);
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.get("/staff/report/").then(response => {
            commit("setAssignedStudents", response.data.reports)
            commit("changeExaminerStatisticsKey")
            commit("setOverlayLoader", false);
        }).catch(error => {
            commit("fetchAssignedStudentsError", error.response.data.message)
            commit("setOverlayLoader", false);
        })
    },
    async receiveReport({
        commit
    }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.patch(`/staff/report/receive/${
            data.report
        }`).then(response => {
            commit("receiveReportSuccess", {
                res: response.data.status,
                student: data.studentName
            })
            commit("setDisplayStudentTableFeedback", true)
            commit("changeExaminerStatisticsKey")
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
            commit("clearReportSuccess", {
                res: response.data.status,
                student: data.studentName
            })
            commit("setDisplayStudentTableFeedback", true)
            commit("changeExaminerStatisticsKey")
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
    assignedStudentsTableMessage: (state) => state.assignedStudentsTableMessage,
    examinerStudentDetails: (state) => state.examinerStudentDetails,
    examinerStatisticsKey: (state) => state.examinerStatisticsKey
}

export default {state, mutations, actions, getters};
