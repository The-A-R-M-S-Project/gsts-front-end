import axiosInstance from "../axios_setup";

const state = {
    student: {},
    reports: [],
    reportsError: null
}
const mutations = {
    studentDetails(state, payload) {
        state.student = payload
    },
    setReports(state, payload) {
        state.reports = payload
    },
    fetchReportsError(state, payload) {
        state.reportsError = payload
    }
}
const actions = {
    setStudentDetails({
        commit
    }, data) {
        commit("studentDetails", data)
    },
    async fetchReports({commit}) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.get('/report').then(response => {
            commit("setReports", response.data)
        }).catch(error => {
            commit("fetchReportsError", error.response)
        })
    }
}
const getters = {
    student: (state) => state.student,
    reports: (state) => state.reports
}
export default {state, mutations, actions, getters};
