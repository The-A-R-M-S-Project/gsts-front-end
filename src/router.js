import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import DummyView from "./views/DummyView.vue";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "login",
			component: Login
		},
		{
			path: "/register",
			name: "register",
			component: Register
		},
		{
			path: "/dummy-view-admin",
			name: "dummy",
			component: DummyView
		}
	]
});
