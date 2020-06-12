import Vue from "vue";
import Vuex from "vuex";
import authentication from "./modules/authentication";
import dashboard from "./modules/dashboard";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authentication,
        dashboard,
    },
    plugins: [createPersistedState()],
});
