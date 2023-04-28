import axios from "@/config/axios";

export default {
  namespaced: true,
  state: () => ({
    all: {
      data: [],
      loading: false,
    },
    userRecord: {
      data: [],
      loading: false,
    },
  }),
  mutations: {
    setData(state,payload) {
        state.all.data = payload
    },
    setLoading(state,payload) {
        state.all.loading = payload
    },
  },
  actions: {
    async get({commit}) {
        commit('setLoading',true)
      try {
        const { data } = await axios.get("get-location", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        commit('setLoading',false)
        commit('setData',data.data)

        console.log("location", data);
      } catch (error) {
        commit('setLoading',false)
        console.log(error);
      }
    },
  },
};
