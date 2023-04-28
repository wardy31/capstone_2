import axios from "@/config/axios";

export default {
  namespaced: true,
  state: () => ({
    user: {
      data: [],
      loading: false,
      error: false,
      message: "",
    },
    clinic: {
      data: [],
      loading: false,
      page: 1,
      error: false,
      message: "",
    },
  }),
  mutations: {
    setData(state, payload) {
      state[payload.type].data = payload.data;
    },
    setLoading(state, payload) {
      state[payload.type].loading = payload.loading;
    },
    setPage(state, payload) {
      state[payload.type].page = payload.page;
    },
  },
  actions: {
    async allRecords({ commit }, params) {
      try {
        const { data } = await axios.get(
          `clinic/visited-log-record?page=${params}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await commit("setData", { type: "clinic", data: data.data.data });
        await commit("setPage", { type: "clinic", page: data.data.last_page });

        console.log("record", params);
      } catch (error) {
        console.log(error);
      }
    },
    async useRecords({ commit }) {
      try {
        const { data } = await axios.get("user/visited-log-record", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        await commit("setData", { type: "user", data: data.data });
        console.log("record", data.data);
      } catch (error) {
        console.log(error);
      }
    },
    async perStation({ commit },params) {
      try {
        const { data } = await axios.get(`clinic/visited-log-record/${params}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        await commit("setData", { type: "clinic", data: data.data.data });
        await commit("setPage", { type: "clinic", page: data.data.last_page });

        console.log('data',data.data.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
