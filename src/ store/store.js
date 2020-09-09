import Vue from "vue";
import Vuex from "vuex";
import authentication from "./modules/authentication";
import dashboard from "./modules/dashboard";
import elevatedStaff from "./modules/elevatedStaff"
import student from "./modules/student";
import examiner from "./modules/examiner";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({isCompression: false});

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authentication,
        dashboard,
        elevatedStaff,
        student,
        examiner
    },
    plugins: [
        createPersistedState(
            {
                storage: {
                    getItem: (key) => ls.get(key),
                    setItem: (key, value) => ls.set(key, value),
                    removeItem: (key) => ls.remove(key)
                }
            }
        ),
    ]
});
