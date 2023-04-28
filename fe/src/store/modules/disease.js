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
    status: {
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
    async search({commit,dispatch},payload){
        if(payload.trim() == ""){
            dispatch('getData')
            return ;
        }
        try {
            const { data } = await axios.get(`clinic/disease-search/${payload}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            commit("setLoading", { type: "all", loading: false });
            commit("setData", { type: "all", data: data.data });
            console.log("data", data.data);
          } catch (error) {
            commit("setLoading", { type: "all", loading: false });
            commit("setError", { type: "all", error: error.response.data.errors });
          }            
    },
    async getData({ commit }) {
      commit("setLoading", { type: "all", loading: true });
      try {
        const { data } = await axios.get("clinic/disease", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        commit("setLoading", { type: "all", loading: false });
        commit("setData", { type: "all", data: data.data });
        console.log("data", data.data);
      } catch (error) {
        commit("setLoading", { type: "all", loading: false });
        commit("setError", { type: "all", error: error.response.data.errors });
      }
    },
    async store({ commit, dispatch }, payload) {
        commit("setLoading", { type: "store", loading: true });
        commit("setError", { type: "store", error: false });
        try {
        const { data } = await axios.post("clinic/store-disease", payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        commit("setLoading", { type: "store", loading: false });
        dispatch("getData");
        console.log("data", data.data);

        return true;
      } catch (error) {
        console.log(error);
        commit("setLoading", { type: "store", loading: false });
        commit("setError", {
          type: "store",
          error: error.response.data.errors,
        });

        return false;
      }
    },
    async update({ commit, dispatch }, payload) {
        commit("setLoading", { type: "update", loading: true });
        try {
          const { data } = await axios.put(
            `clinic/update-disease/${payload.id}`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          commit("setLoading", { type: "update", loading: false });
          dispatch("getData");
          console.log("data", data.data);
  
          return true;
        } catch (error) {
          commit("setLoading", { type: "update", loading: false });
          commit("setError", {
            type: "update",
            error: error.response.data.errors,
          });
  
          return false;
        }
      },
      async status({ commit, dispatch }, payload) {
        commit("setLoading", { type: "status", loading: true });
        try {
          const { data } = await axios.put(
            `clinic/update-disease-status/${payload.id}`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          commit("setLoading", { type: "status", loading: false });
          dispatch("getData");
          console.log("data", data.data);
  
          return true;
        } catch (error) {
          commit("setLoading", { type: "status", loading: false });
          commit("setError", {
            type: "status",
            error: error.response.data.errors,
          });
  
          return false;
        }
      },      
      async delete({ commit, dispatch }, payload) {
        commit("setLoading", { type: "delete", loading: true });
        try {
          const { data } = await axios.delete(
            `clinic/delete-disease/${payload.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          commit("setLoading", { type: "delete", loading: false });
          dispatch("getData");
          console.log("data", data.data);
  
          return true;
        } catch (error) {
          commit("setLoading", { type: "delete", loading: false });
          commit("setError", {
            type: "delete",
            error: error.response.data.errors,
          });
  
          return false;
        }
      },

    },
};
