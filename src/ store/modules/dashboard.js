// import axiosInstance from "../axios_setup";
import dashboardData from "../../services/dashboard-data.json";

const state = {
    dashboardStats: dashboardData
};
const mutations = {};
const actions = {};
const getters = {
    dashboardStats: state => state.dashboardStats
};

export default {
    state,
    mutations,
    actions,
    getters
};
