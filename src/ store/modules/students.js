// import axiosInstance from "../axios_setup";

const state = {
    student: {}
}
const mutations = {
    studentDetails(state, payload) {
        state.student = payload
    }
}
const actions = {
    setStudentDetails({
        commit
    }, data) {
        commit("studentDetails", data)
    }
}
const getters = {
    student: (state) => state.student
}
export default {state, mutations, actions, getters};
