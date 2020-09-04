import axiosInstance from "../axios_setup";

const state = {
    tableLoading: false,
    detailLoading: false,
    submitLoading: false,
    student: {},
    reports: [],
    examiners: [],
    reportActionMessage: '',
    reportSubmitMessage: '',
    departments: [],
    assignedStudents: [],
    examinerStudentDetails: {},
    studentReportError: null,
    reportSubmitError: null,
    reportsError: null,
    studentDetailsError: null,
    fetchAssignedStudentsError: null,
    fetchExaminersError: null,
    studentDashboardError: null
}
const mutations = {
    setLoader(state, payload) {
        state.tableLoading = payload
    },
    setDetailLoader(state, payload) {
        state.detailLoading = payload
    },
    setSubmitLoader(state, payload) {
        state.submitLoading = payload
    },
    studentDetails(state, payload) {
        state.student = payload
    },
    setReports(state, payload) {
        state.reports = payload
    },
    setDepartments(state, payload) {
        state.departments = payload
    },
    setAssignedStudents(state, payload) {
        state.assignedStudents = payload
    },
    examinerStudentDetails(state, payload) {
        state.examinerStudentDetails = payload
    },
    setLoggedInStudentDetails(state, payload) {
        state.student = payload
    },
    addNewReport(state, payload) {
        state.reportActionMessage = payload
    },
    submitReport(state, payload) {
        state.reportSubmitMessage = payload
    },
    setExaminerList(state, payload) {
        state.examiners = payload
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
    fetchReportsError(state, payload) {
        state.reportsError = payload
    },
    fetchStudentDetailsError(state, payload) {
        state.studentDetailsError = payload
    },
    fetchDepartmentsError(state, payload) {
        state.studentDetailsError = payload
    },
    fetchAssignedStudentsError(state, payload) {
        state.fetchAssignedStudentsError = payload
    },
    fetchStudentDashboardError(state, payload) {
        state.studentDashboardError = payload
    },
    fetchExaminerError(state, payload) {
        state.fetchExaminersError = payload
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
    async fetchStudentDepartment({
        commit
    }, data) {
        await axiosInstance.get(`/school/${data}/department`).then(response => {
            commit("setDepartments", response.data.departments)
        }).catch(error => {
            commit("fetchDepartmentsError", error.response.data.message)
        })
    },
    async fetchAssignedStudents({commit}) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.get("/staff/report/").then(response => {
            commit("setAssignedStudents", response.data.reports)
        }).catch(error => {
            commit("fetchAssignedStudentsError", error.response.data.message)
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
            commit("fetchStudentDashboardError", error.response.data.message)
            commit("setOverlayLoader", false);
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
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.patch("/student/report/submit", data).then(response => {
            commit("submitReport", response.data.message)
            commit("setSubmitLoader", false)
        }).catch(error => {
            commit("setSubmitLoader", false)
            commit("setReportSubmitError", error.response.data.message)
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
    setExaminerStudentDetails({
        commit
    }, data) {
        commit("examinerStudentDetails", data)
    }
}
const getters = {
    student: (state) => state.student,
    studentSchool: (state) => {
        return state.schools.filter((school) => {
            return school._id === state.student.school;
        })[0].name;
    },
    reports: (state) => state.reports,
    department: (state) => {
        return state.departments.filter(department => {
            return department._id === state.student.department
        })[0]
    },
    assignedStudents: (state) => state.assignedStudents,
    examinerStudentDetails: (state) => state.examinerStudentDetails,
    tableLoading: (state) => state.tableLoading,
    detailLoading: (state) => state.detailLoading,
    submitLoading: (state) => state.submitLoading,
    reportActionMessage: (state) => state.reportActionMessage,
    reportSubmitMessage: (state) => state.reportSubmitMessage,
    reportSubmitError: (state) => state.reportSubmitError,
    examiners: (state) => {
        return state.examiners.filter(staff => {
            return staff.role === "examiner"
        })
    }
}
export default {state, mutations, actions, getters};
