import axios from "@/config/axios";
// import { all } from "core-js/fn/promise";
// import Swal from 'sweetalert2'
export default {
  namespaced: true,
  state: () => ({
    all: {
      data: [],
      error: false,
      message: "",
      dialog: false,
      loading: false,
    },
    selected: {
      loading: false,
    },
  }),
  mutations: {
    setData(state, data) {
      state[data.type].data = data.data;
    },
    setDialog(state, data) {
      state.all.dialog = data;
    },
    setLoading(state, data) {
      state.all.loading = data;
    },
    setError(state, data) {
      state.all.error = data.error;
      state.all.message = data.message;
    },
  },
  actions: {
    async submitCheckSelected({ state }, param) {
      state.selected.loading = true;
      try {
        await axios.post(
          `clinic/store-contact-selected/${param.id}`,
          param.data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        state.selected.loading = false;
        return true;
      } catch (error) {
        console.log(error);
        state.selected.loading = false;
        return false;
      }
    },
    async getVisitedLocation({ commit }, payload) {
      commit("setLoading", true);
      axios
        .get(`clinic/get-visited-location/${payload}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          const { data } = res.data;
          commit("setLoading", false);
          commit("setData", { type: "all", data: data });
          // Swal.fire({
          //     title: 'Success',
          //     text: 'Successfully Submitted',
          //     icon: 'success',
          //     confirmButtonText: 'close',
          //     timer: 2000
          //   })
          console.log(data);
        })
        .catch((err) => {
          commit("setError", {
            error: true,
            message: err.response.data.message,
          });
          commit("setLoading", false);
          console.log(err.response.data);
        });
    },
    async filterVisitedRecord({ commit }, payload) {
      commit("setLoading", true);
      axios
        .post(`clinic/get-filter-visited-location/${payload.id}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          const { data } = res.data;
          commit("setLoading", false);
          commit("setData", { type: "all", data: data });
          // Swal.fire({
          //     title: 'Success',
          //     text: 'Successfully Submitted',
          //     icon: 'success',
          //     confirmButtonText: 'close',
          //     timer: 2000
          //   })
          console.log(data);
        })
        .catch((err) => {
          commit("setError", {
            error: true,
            message: err.response.data.message,
          });
          commit("setLoading", false);
          console.log(err.response.data);
        });
    },
    async submitContact({ commit, dispatch }, payload) {
      commit("setLoading", false);

      try {
        const res = await axios.post("clinic/store-contact", payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        dispatch("filterVisitedRecord", payload.filter);
        console.log("submitted", res.data);
        return true
      } catch (err) {
        console.log(err.response.data);
        return false
      }
    },
  },
};
