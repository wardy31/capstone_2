import axios from "@/config/axios";

export default {
  namespaced: true,
  state: () => ({
    all: {
      data: [],
      loading: false,
      error: "",
      page: 1,
    },
    store: {
      loading: false,
      error: "",
    },
    credentials: {
      data: "null",
      loading: false,
      next: false,
      error: false,
      message: "",
    },
    updateProfile: {
      loading: false,
      error: false,
      success: false,
      message: "",
      dialog: false,
    },
    checkProfile: {
      data: null,
      loading: false,
    },
    password: {
      loading: false,
      error: false,
      success: false,
      message: "",
    },
    details:{
      data:null
    }
  }),
  mutations: {
    user(state, data) {
      state.credentials.data = data;
    },
    profile(state, data) {
      state.checkProfile.data = data;
    },
    next(state, data) {
      state.credentials.next = data;
    },
    setData(state, data) {
      state[data.type].data = data.data;
    },
    setPage(state, data) {
      state[data.type].page = data.page
    },
    setLoading(state, data) {
      state[data.type].loading = data.loading;
    },
    loading(state, loading) {
      state.credentials.loading = loading;
    },
    error(state, error) {
      state.credentials.error = error.error;
      state.credentials.message = error.message;
    },
    password(state, error) {
      state.password.error = error.error;
      state.password.message = error.message;
    },
  },
  actions: {
    async getAllUser({ commit }, param) {
      commit("setLoading", { type: "all", loading: true });
      try {
        const { data } = await axios.get(`clinic/get-users?page=${param}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        await commit("setLoading", { type: "all", loading: false });
        await commit("setData", { type: "all", data: data.data.data });
        await commit("setPage", { type: "all", page: data.data.last_page });
        console.log(data.data);
      } catch (error) {
        commit("setLoading", { type: "all", loading: true });
        console.log(error);
      }
    },
    async userSearch({ commit, dispatch }, param) {
      commit("setLoading", { type: "all", loading: true });
      if (!param.trim()) {
        dispatch('getAllUser')
        return false
      }
      try {
        const { data } = await axios.get(`clinic/user-search/${param}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        await commit("setLoading", { type: "all", loading: false });
        await commit("setData", { type: "all", data: data.data });
        console.log(data.data);
      } catch (error) {
        commit("setLoading", { type: "all", loading: true });
        console.log(error);
      }
    },
    async checkProfile({ commit }, payload) {
      // commit("loading", true);
      try {
        const { data } = await axios.get(`user/check-profile/${payload}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("checkProfile", data);
        commit("profile", data);
      } catch (error) {
        console.log(error);
      }
    },
    async getUser({ commit }) {
      commit("loading", true);
      axios
        .get("user", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          commit("loading", false);
          commit("user", res.data.data);
          console.log(res.data.data);
        })
        .catch(() => {
          commit("loading", false);
        });
    },
    async updateProfile({ commit, state }, payload) {
      state.updateProfile.loading = true;
      state.updateProfile.error = false;
      state.updateProfile.success = false;
      axios
        .put(`user/update/${payload.id}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          commit("user", res.data.data);
          state.updateProfile.loading = false;
          state.updateProfile.dialog = false;
          state.updateProfile.success = true;
          state.updateProfile.message =
            "Personal Information Updated Successfully.";
        })
        .catch((err) => {
          state.updateProfile.dialog = false;
          state.updateProfile.loading = false;
          state.updateProfile.error = true;
          state.updateProfile.message = err.response.data.message;
          console.log(err.response.data);
        });
    },
    async changePassword({ commit, state }, payload) {
      console.log(commit);
      console.log(payload);
      state.password.loading = true;
      commit("password", {
        error: false,
        message: ""
      });
      state.password.success = false;
      axios
        .put("user/update-password", payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          state.password.loading = false;
          state.password.success = true;
          state.password.message = res.data.message;
          console.log(res.data);
        })
        .catch((err) => {
          commit("password", {
            error: true,
            message: err.response.data.errors,
          });
          state.password.loading = false;
          console.log(err.response.data);
        });
    },
    async login({ commit }, payload) {
      commit("loading", true);
      await axios
        .post("login-user", payload)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          commit("user", res.data.data);
          commit("next", true);
          commit("loading", false);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
          commit("loading", false);
          commit("error", { error: true, message: err.response.data.errors });
        });
    },
    async logout({ commit }) {
      axios
        .post("logout", {})
        .then((res) => {
          commit("user", null);
          localStorage.removeItem("token");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    async reset({ commit }) {
      commit("next", false);
    },
    async userDetails({commit},id){
      try {
          const {data} = await axios.get(`user-details/${id}`,{
            headers:{
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          })
          
          commit('setData',{type:"details",data:data})
      } catch (error) {
          console.log(error);
      }
    }
  },
  getters: {},
};
