import axios from "@/config/axios";
// import moment from "moment";

export default {
  namespaced: true,
  state: () => ({
    data: [],
    loading: [],
    dot: false,
  }),
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setLoading(state, data) {
      state.loading = data;
    },
    setDot(state, data) {
      state.dot = data;
    },
  },
  actions: {
    async getNotifications({ commit, state }) {
      commit("setLoading", true);
      try {
        const { data } = await axios.get(`clinic-notifications`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (data.length > state.data.length) {
          if (data.length) {
              await commit("setData", data);
              commit("setDot", true);
            }
          }
        await commit("setLoading", false);

        return true
      } catch (error) {
        commit("setLoading", false);
        console.log(error);

        return false
      }
    },
  },
};
