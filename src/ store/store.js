import Vue from "vue";
import Vuex from "vuex";
import authentication from "./modules/authentication";
import dashboard from "./modules/dashboard";
import elevatedStaff from "./modules/elevatedStaff"
import student from "./modules/student";
import examiner from "./modules/examiner";
import profileEdit from "./modules/profileEdit"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authentication,
        dashboard,
        elevatedStaff,
        student,
        examiner,
        profileEdit
    }
});
