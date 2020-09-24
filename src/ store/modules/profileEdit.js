import axiosInstance from "../axios_setup"
const state = {
    profileItemTag: null,
    editProfile: false,
    profileEditLoader: false,
    profileEditMessage: null,
    displayProfileEditMessage: false
}
const mutations = {
    setProfileItemTag(state, payload) {
        state.profileItemTag = payload
    },
    setProfileEdit(state, payload) {
        state.editProfile = payload
    },
    setProfileEditLoader(state, payload) {
        state.profileEditLoader = payload
    },
    profileEditSucess(state, payload) {
        let success = `${
            payload.res[0].toUpperCase()
        }${
            payload.res.slice(1)
        }`;
        state.profileEditMessage = `${success}. Your ${
            payload.tag
        } has been updated`
    },
    profileEditFailure(state, payload) {
        if (payload.err.includes("Duplicate")) {
            state.profileEditMessage = `Failed. That ${
                payload.tag
            } already exists!`
        }
    },
    displayProfileEditMessage(state, payload) {
        state.displayProfileEditMessage = payload
    }
}
const actions = {
    async editProfileDetails({
        commit
    }, data) {
        commit("setProfileEditLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        await axiosInstance.patch(`/${
            data.role
        }/updateMe`, data.item).then(response => {
            commit("profileEditSucess", {
                res: response.data.status,
                tag: data.tag
            })
            commit("setProfileEditLoader", false)
            commit("displayProfileEditMessage", true)
        }).catch(error => {
            commit("setProfileEditLoader", false)
            commit("profileEditFailure", {
                err: error.response.data.message,
                tag: data.tag
            })
            commit("displayProfileEditMessage", true)
        })
    },
    setProfileItemTag({
        commit
    }, data) {
        commit("setProfileItemTag", data)
        commit("setProfileEdit", true)
    },
    showProfileEditor({
        commit
    }, data) {
        commit("setProfileEdit", data)
    },
    displayProfileEditMessage({
        commit
    }, data) {
        commit("displayProfileEditMessage", data)
    }
}
const getters = {
    profileItemTag: (state) => state.profileItemTag,
    editProfile: (state) => state.editProfile,
    profileEditLoader: (state) => state.profileEditLoader,
    profileEditMessage: (state) => state.profileEditMessage,
    displayProfileEditMessage: (state) => state.displayProfileEditMessage
}
export default {state, mutations, actions, getters}
