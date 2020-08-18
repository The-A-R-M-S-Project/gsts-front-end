import Vue from "vue";
import Vuex from "vuex";
import authentication from "./modules/authentication";
import dashboard from "./modules/dashboard";
import students from "./modules/students";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({isCompression: false});

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authentication,
        dashboard,
        students
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
