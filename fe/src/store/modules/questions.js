import axios from "../../config/axios";

export default {
  namespaced: true,
  state: () => ({
    all: {
      data: [],
      loading: false,
      error: false,
    },
    store: {
      loading: false,
      error: false,
    },
    update: {
      loading: false,
      error: false,
    },
    delete: {
      loading: false,
      error: false,
    },
  }),
  mutations: {
    setData(state, payload) {
      state[payload.type].data = payload.data;
    },
    setLoading(state, payload) {
      state[payload.type].loading = payload.loading;
    },
    setError(state, payload) {
      state[payload.type].error = payload.error;
    },
  },
  actions: {
    async getData({ commit }) {
      try {
        const { data } = await axios.get(`clinic/questionnaires`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        commit("setData", { type: "all", data: data.data });
      } catch (error) {
        commit("setError", error.response?.status);
      }
    },
    async store({ commit,dispatch }, payload) {
      commit("setLoading", { type: "store", loading: true });
      commit("setError", {type:"store",error:false});
      try {
        await axios.post(`clinic/questionnaires`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        commit("setLoading", { type: "store", loading: false });
        dispatch('getData')
        return true;
      } catch (error) {
        commit("setError", {type:"store",error:error.response?.data.errors});
        commit("setLoading", { type: "store", loading: false });
        return false
      }
    },
    async update({commit,dispatch},payload) {
        commit("setLoading", { type: "update", loading: true });
        commit("setError", {type:"update",error:false});
        try {
          await axios.put(`clinic/questionnaires/${payload.id}`, payload, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          commit("setLoading", { type: "update", loading: false });
          dispatch('getData')

          return true;
        } catch (error) {
          commit("setError", {type:"update",error:error.response?.data.errors});
          commit("setLoading", { type: "update", loading: false });
          return false
        }
      },
    async delete({commit,dispatch},payload) {
        commit("setLoading", { type: "delete", loading: true });
        commit("setError", {type:"delete",error:false});
        try {
          await axios.delete(`clinic/questionnaires/${payload.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          commit("setLoading", { type: "delete", loading: false });
          dispatch('getData')
          return true;
        } catch (error) {
          commit("setError", {type:"delete",error:error.response?.data.errors});
          commit("setLoading", { type: "delete", loading: false });
          return false
        }
    },
  },
};
