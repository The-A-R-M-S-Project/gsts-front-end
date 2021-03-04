import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify.js";
import Axios from "axios";
import axiosInstance from "./ store/axios_setup";
import store from "./ store/store";

Vue.use(vuetify)

Vue.prototype.$http = Axios;

axiosInstance.interceptors.response.use((response) => {
    if (response.status === 200 || response.status === 201) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, (error) => {
    if (error.response.data.message === "Your token has expired! Please log in again." || error.response.data.message === "You are not logged in! Please log in to get access.") {
        router.push("/expired-session");
    } else {
        return Promise.reject(error);
    }
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
}).$mount("#app");
