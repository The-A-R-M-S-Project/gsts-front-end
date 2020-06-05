import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify.js";
import Axios from "axios";
import store from "./ store/store";

Vue.prototype.$http = Axios;
const token = localStorage.getItem("access");
if (token) {
    Vue.prototype.$http.defaults.headers.common[
        "Authorization"
    ] = `bearer ${token}`;
}

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
