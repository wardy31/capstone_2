import axios from "@/config/axios";
import Swal from "sweetalert2";
export default {
  namespaced: true,
  state: () => ({
    all: {
      data: [],
      loading: false,
      error: false,
      message: "",
    },
    matching: {
      data: null,
      loading: false,
      error: false,
      success: false,
      message: "",
      playing: true,
    },
  }),
  mutations: {
    setData(state, payload) {
      state[payload.type].data = payload.data;
    },
    setLoading(state, payload) {
      state[payload.type].loading = payload.loading;
    },
    setPlaying(state, payload) {
      state.matching.playing = payload;
    },
  },
  actions: {
    async getVisitedUser({ commit }, payload) {
      try {
        const { data } = await axios.post(
          "station/get-visitor",
          { location_id: payload },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("visited user", data);
        await commit("setData", { type: "all", data: data.data });
      } catch (error) {
        console.log(error);
      }
    },
    async matchUser({ commit, dispatch }, payload) {
    console.log('paylaod', payload);
    localStorage.setItem('location', payload.location_id)
      commit("setPlaying", false);
      try {
        const { data } = await axios.post("station/match",{location_id:localStorage.getItem("location"),user_id:payload.user_id}, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        await commit("setPlaying", true);
        console.log('paylaod inner', payload);
        await Swal.fire({
          title: "Success",
          text: `Successfully Logged In`,
          icon: "success",
          confirmButtonText: "close",
          timer: 2000,
        });
        await commit("setData", { type: "matching", data: data.data });
        await dispatch("getVisitedUser", payload.location_id);
        console.log("matching Data", data.data);
      } catch (error) {
        console.log(error);
        commit("setPlaying", true);
      }
    },
  },
};
