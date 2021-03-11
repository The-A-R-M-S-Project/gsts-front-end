import axiosInstance from "../axios_setup"

const state = {
    student: {},
    selectedStudent: {},
    studentDetailsError: null,
    tableLoading: false,
    reports: [],
    reportsError: null,
    examiners: [],
    fetchExaminersError: null,
    submitLoading: false,
    reportComments: [],
    createCommentError: null,
    requestResubmissionMessage: '',
    requestResubmissionError: null,
    displayStudentTableFeedback: false,
    assignExaminerError: null,
    studentsTableMessage: '',
    vivaDateError: null,
    studentsTableKey: 0,
    vivaScoreError: null,
    progressEvents: {
        notSubmitted: {
            value: 0,
            message: "Not submitted",
            color: "grey",
            step: 1
        },
        submitted: {
            value: 11,
            message: "Submitted",
            color: "deep-orange darken-3",
            step: 2
        },
        assignedToExaminers: {
            value: 23,
            message: "Assigned to examiners",
            color: "deep-orange darken-2",
            step: 2
        },
        receivedByExaminers: {
            value: 34,
            message: "Received by examiners",
            color: "deep-orange darken-1",
            step: 3
        },
        clearedByExaminers: {
            value: 45,
            message: "Cleared by examiners",
            color: "orange",
            step: 4
        },
        vivaDateSet: {
            value: 56,
            message: "Viva date set",
            color: "pink",
            step: 5
        },
        vivaComplete: {
            value: 67,
            message: "Viva complete",
            color: "amber",
            step: 6
        },
        pendingRevision: {
            value: 78,
            message: "Pending revision",
            color: "yellow darken-1",
            step: 6
        },
        complete: {
            value: 100,
            message: "Pending revision",
            color: "green lighten-2",
            step: 7
        }
    }
}
const mutations = {
    fetchStudentDetailsError(state, payload) {
        state.studentDetailsError = payload
    },
    setSelectedStudent(state, payload) {
        state.selectedStudent = payload
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
    addReportComment(state, payload) {
        if (state.reportComments[0].text === 'No comments have been made on this report') {
            state.reportComments.pop()
        }
        state.reportComments.push(payload)
    },
    setCreateCommentError(state, payload) {
        state.createCommentError = payload
    },
    setReportComments(state, payload) {
        state.reportComments = payload
    },
    requestResubmissionSuccess(state, payload) {
        state.requestResubmissionMessage = payload
    },
    setRequestResubmissionError(state, payload) {
        state.requestResubmissionError = payload
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
        try {
            let response = await axiosInstance.get('/report')
            commit("setReports", response.data)
            commit("setLoader", false)
        } catch (error) {
            commit("setLoader", false)
            commit("fetchReportsError", error.response.data.message)
        }
    },
    async requestResubmission({
        commit
    }, data) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        commit("setSubmitLoader", true)
        try {
            let response = await axiosInstance.patch(`/report/staff/student/resubmit/${
                data.report
            }`, data.reason)
            commit("requestResubmissionSuccess", response.data.status)
            commit("setSubmitLoader", false)
        } catch (error) {
            commit("setSubmitLoader", false)
            commit("setRequestResubmissionError", error.response.data.message)
        }
    },
    async createComment({
        commit
    }, data) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        commit("setSubmitLoader", true)
        try {
            let response = await axiosInstance.post(`/comment/report/${
                data.report
            }`, data.comment)
            commit("addReportComment", response.data.comment)
            commit("setSubmitLoader", false)
        } catch (error) {
            commit("setSubmitLoader", false)
            commit("setCreateCommentError", error.response.data.message)
        }
    },
    async fetchReportComments({
        commit
    }, data) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.get(`/comment/report/${data}`)
            commit("setReportComments", response.data.comments)
        } catch (error) {
            commit("setReportComments", [{
                    text: error.response.data.message
                }])
        }
    },
    async fetchExaminers({commit}) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.get("/staff/")
            commit("setExaminerList", response.data)
        } catch (error) {
            commit("fetchExaminerError", error.response.data.message)
        }
    },
    async assignExaminer({
        commit
    }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.patch(`/report/staff/examiner/assign/${
                data.studentReportID
            }`, {
                examiner: data.examinerID,
                examinerType: data.examinerType
            })
            commit("assignExaminerSuccess", {
                res: response.data.status,
                examiner: data.examinerName,
                student: data.studentName
            })
            commit("setDisplayStudentTableFeedback", true)
            commit("setSubmitLoader", false)
        } catch (error) {
            commit("setSubmitLoader", false)
            console.log(error)
            commit("setAssignExaminerError", error.response.data.message)
        }
    },
    async setVivaDate({
        commit
    }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.patch(`/viva/staff/vivadate/${
                data.reportID
            }`, data.vivaDate)
            commit("setVivaDateSuccess", {
                res: response.data.status,
                name: data.studentName
            })
            commit("setDisplayStudentTableFeedback", true)
            commit("setSubmitLoader", false)
        } catch (error) {
            commit("setSubmitLoader", false)
            commit("setVivaDateError", error.response.data.message)
        }
    },
    async setVivaScore({
        commit
    }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.patch(`/viva/staff/vivascore/${
                data.reportID
            }`, data.vivaScore)
            commit("setVivaScoreSuccess", {
                res: response.data.status,
                name: data.studentName
            })
            commit("setDisplayStudentTableFeedback", true)
            commit("setSubmitLoader", false)
        } catch (error) {
            commit("setSubmitLoader", false)
            commit("setVivaScoreError", error.response.data.message)
        }
    },
    setSelectedStudent({
        commit
    }, data) {
        commit("setSelectedStudent", data)
    },
    setDisplayStudentTableFeedback({
        commit
    }, data) {
        commit("setDisplayStudentTableFeedback", data)
    },
    changeStudentsTableKey({commit}) {
        commit("changeStudentsTableKey")
    },
    filterBySchool({
        commit
    }, data) {
        let students = data.reports.filter(report => {
            return(report.student["department"].school == data.id);
        })
        commit("setReports", students)
    },
    filterByDepartment({
        commit
    }, data) {
        let students = data.reports.filter(report => {
            return(report.student["department"]._id == data.id);
        })
        commit("setReports", students)
    }
}
const getters = {
    submitLoading: (state) => state.submitLoading,
    tableLoading: (state) => state.tableLoading,
    progressEvents: (state) => state.progressEvents,
    selectedStudent: (state) => state.selectedStudent,
    reports: (state) => state.reports,
    examiners: (state) => {
        return state.examiners.filter(staff => {
            return staff.role === "examiner"
        })
    },
    reportComments: (state) => state.reportComments,
    assignExaminerMessage: (state) => state.assignExaminerMessage,
    requestResubmissionError: (state) => state.requestResubmissionError,
    assignedExaminer: (state) => state.assignedExaminer,
    requestResubmissionMessage: (state) => state.requestResubmissionMessage,
    displayStudentTableFeedback: (state) => state.displayStudentTableFeedback,
    studentsTableMessage: (state) => state.studentsTableMessage,
    studentsTableKey: (state) => state.studentsTableKey
}

export default {state, mutations, actions, getters}
