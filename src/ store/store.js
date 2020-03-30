import Vue from "vue";
import Vuex from "vuex";
import authentication from "./modules/authentication";
import dashboard from "./modules/dashboard";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authentication,
        dashboard
    }
});
