import axiosInstance from "../axios_setup"

const state = {
    detailLoading: false,
    student: {},
    studentDetailsError: null,
    tableLoading: false,
    reports: [],
    reportsError: null,
    examiners: [],
    fetchExaminersError: null,
    submitLoading: false,
    displayStudentTableFeedback: false,
    assignExaminerError: null,
    studentsTableMessage: '',
    vivaDateError: null,
    studentsTableKey: 0,
    vivaScoreError: null
}
const mutations = {
    setDetailLoader(state, payload) {
        state.detailLoading = payload
    },
    fetchStudentDetailsError(state, payload) {
        state.studentDetailsError = payload
    },
    setLoader(state, payload) {
        state.tableLoading = payload
    },
    setReports(state, payload) {
        state.reports = payload
    },
    fetchReportsError(state, payload) {
        state.reportsError = payload
    },
    setExaminerList(state, payload) {
        state.examiners = payload
    },
    fetchExaminerError(state, payload) {
        state.fetchExaminersError = payload
    },
    setSubmitLoader(state, payload) {
        state.submitLoading = payload
    },
    assignExaminerSuccess(state, payload) {
        let str = payload.res
        let success = `${
            str[0].toUpperCase()
        }${
            str.slice(1)
        }`;
        state.studentsTableMessage = `${success}. You've assigned ${
            payload.examiner
        } to ${
            payload.student
        }'s report`
    },
    setDisplayStudentTableFeedback(state, payload) {
        state.displayStudentTableFeedback = payload
    },
    setAssignExaminerError(state, payload) {
        state.assignExaminerError = payload
    },
    setVivaDateSuccess(state, payload) {
        let str = payload.res
        let success = `${
            str[0].toUpperCase()
        }${
            str.slice(1)
        }`;
        state.studentsTableMessage = `${
            success
        }. You've set a viva date for ${
            payload.name
        }`
    },
    setVivaDateError(state, payload) {
        state.vivaDateError = payload
    },
    changeStudentsTableKey(state) {
        state.studentsTableKey ++
    },
    setVivaScoreSuccess(state, payload) {
        let str = payload.res
        let success = `${
            str[0].toUpperCase()
        }${
            str.slice(1)
        }`;
        state.studentsTableMessage = `${
            success
        }. You've set a viva score for ${
            payload.name
        }`
    },
    setVivaScoreError(state, payload) {
        state.vivaScoreError = payload
    }
}
const actions = {
    async fetchReports({commit}) {
        commit("setLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.get('/report').then(response => {
            commit("setReports", response.data)
            commit("setLoader", false)
        }).catch(error => {
            commit("setLoader", false)
            commit("fetchReportsError", error.response.data.message)
        })
    },
    async fetchExaminers({commit}) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.get("/staff/").then(response => {
            commit("setExaminerList", response.data)
        }).catch(error => {
            commit("fetchExaminerError", error.response.data.message)
        })
    },
    async assignExaminer({
        commit
    }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.patch(`/staff/report/examiner/assign/${
            data.studentReportID
        }`, {examiner: data.examinerID}).then(response => {
            commit("assignExaminerSuccess", {
                res: response.data.status,
                examiner: data.examinerName,
                student: studentName
            })
            commit("setDisplayStudentTableFeedback", true)
            commit("setSubmitLoader", false)
        }).catch(error => {
            commit("setSubmitLoader", false)
            commit("setAssignExaminerError", error.response.data.message)
        })
    },
    async setVivaDate({
        commit
    }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.patch(`/staff/report/vivadate/${
            data.reportID
        }`, data.vivaDate).then(response => {
            commit("setVivaDateSuccess", {
                res: response.data.status,
                name: data.studentName
            })
            commit("setDisplayStudentTableFeedback", true)
            commit("setSubmitLoader", false)
        }).catch(error => {
            commit("setSubmitLoader", false)
            commit("setVivaDateError", error.response.data.message)
        })
    },
    async setVivaScore({
        commit
    }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.patch(`/staff/report/vivascore/${
            data.reportID
        }`, data.vivaScore).then(response => {
            commit("setVivaScoreSuccess", {
                res: response.data.status,
                name: data.studentName
            })
            commit("setDisplayStudentTableFeedback", true)
            commit("setSubmitLoader", false)
        }).catch(error => {
            commit("setSubmitLoader", false)
            commit("setVivaScoreError", error.response.data.message)
        })
    },
    setDisplayStudentTableFeedback({
        commit
    }, data) {
        commit("setDisplayStudentTableFeedback", data)
    },
    changeStudentsTableKey({commit}) {
        commit("changeStudentsTableKey")
    }
}
const getters = {
    detailLoading: (state) => state.detailLoading,
    tableLoading: (state) => state.tableLoading,
    reports: (state) => state.reports,
    examiners: (state) => {
        return state.examiners.filter(staff => {
            return staff.role === "examiner"
        })
    },
    assignExaminerMessage: (state) => state.assignExaminerMessage,
    assignedExaminer: (state) => state.assignedExaminer,
    displayStudentTableFeedback: (state) => state.displayStudentTableFeedback,
    studentsTableMessage: (state) => state.studentsTableMessage,
    studentsTableKey: (state) => state.studentsTableKey
}

export default {state, mutations, actions, getters}
