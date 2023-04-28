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
      page: 1,
      allContacts: null,
    },
    update: {
      dialog: false,
      loading: false,
    },
    delete: {
      dialog: false,
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
    setPage(state, data) {
      state.all.page = data;
    },
    setError(state, data) {
      state.all.error = data.error;
      state.all.message = data.message;
    },
    setContacts(state, data) {
      state.all.allContacts = data;
    },
  },
  actions: {
    async searchPatient({ commit, dispatch }, param) {
      commit("setLoading", true);
      if (!param.trim()) {
        dispatch("getPatient");
      }
      axios
        .get(`clinic/patient-search/${param}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          const { data } = res.data;
          commit("setLoading", false);
          commit("setData", { type: "all", data: data });
          console.log("patient", data);
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
    async getPatient({ commit }, param) {
      commit("setLoading", true);
      axios
        .get(`clinic/get-patient?page=${param}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          const { data, active_patient } = res.data;
          commit("setLoading", false);
          commit("setData", { type: "all", data: data.data });
          commit("setPage", data.last_page);
          commit("setContacts", active_patient);
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
    async getContacts({ commit }, payload) {
      commit("setLoading", true);
      axios
        .get(`clinic/get-contact/${payload}`, {
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
          console.log("contacts", data);
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
    async submitContact({ commit }, payload) {
      commit("setLoading", false);
      axios
        .post("clinic/store-contact", payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          console.log("submitted", res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    //Delete and duration dialog patient
    async updateTaggedDuration({ state, dispatch }, payload) {
      state.update.loading = true;
      axios
        .put(`clinic/update-tagged/${payload.id}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          dispatch("getContacts", payload.paramId);
          console.log(res.data);
          state.update.loading = false;
          state.update.dialog = false;
        })
        .catch((err) => {
          console.log(err.response.data);
          state.update.loading = false;
        });
    },
    async updatePatientDuration({ state, dispatch }, payload) {
      state.update.loading = true;
      axios
        .put(`clinic/update-patient/${payload.id}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          dispatch("getPatient");
          console.log(res.data);
          state.update.loading = false;
          state.update.dialog = false;
        })
        .catch((err) => {
          console.log(err.response.data);
          state.update.loading = false;
        });
    },
    async deleteTagged({ state, dispatch }, payload) {
      state.delete.loading = true;

      axios
        .delete(`clinic/delete-contact/${payload.deleteId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(() => {
          dispatch("getContacts", payload.paramId);
          state.delete.dialog = false;
          state.delete.loading = false;
        })
        .catch((err) => {
          console.log(err.response.data);
          state.delete.loading = false;
        });
    },
    async deletePatient({ state, dispatch }, payload) {
      state.delete.loading = true;

      const res = await axios
        .delete(`clinic/delete-patient/${payload.deleteId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(() => {
          dispatch("getContacts", payload.paramId);
          state.delete.dialog = false;
          state.delete.loading = false;

          return true;
        })
        .catch((err) => {
          console.log(err.response.data);
          state.delete.loading = false;
          return false;
        });

      return res;
    },
  },
};
