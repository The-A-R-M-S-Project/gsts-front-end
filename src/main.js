import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import Axios from "axios";
import store from "./ store/store";

Vue.use(Vuetify);
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
    render: h => h(App)
}).$mount("#app");
