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
    displayStudentTableFeedback: false,
    assignExaminerError: null,
    studentsTableMessage: '',
    vivaDateError: null,
    studentsTableKey: 0,
    vivaScoreError: null
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
    selectedStudent: (state) => state.selectedStudent,
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
