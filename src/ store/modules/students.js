import axiosInstance from "../axios_setup";

const state = {
    tableLoading: false,
    detailLoading: false,
    student: {},
    reports: [],
    departments: [],
    assignedStudents: [],
    examinerStudentDetails: {},
    reportsError: null,
    studentDetailsError: null,
    fetchAssignedStudentsError: null
}
const mutations = {
    setLoader(state, payload) {
        state.tableLoading = payload
    },
    setDetailLoader(state, payload) {
        state.detailLoading = payload
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
    setExaminerStudentDetails({
        commit
    }, data) {
        commit("examinerStudentDetails", data)
    }
}
const getters = {
    student: (state) => state.student,
    reports: (state) => state.reports,
    department: (state) => {
        return state.departments.filter(department => {
            return department._id === state.student.department
        })[0]
    },
    assignedStudents: (state) => state.assignedStudents,
    examinerStudentDetails: (state) => state.examinerStudentDetails,
    tableLoading: (state) => state.tableLoading,
    detailLoading: (state) => state.detailLoading
}
export default {state, mutations, actions, getters};
