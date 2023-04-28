import axios from "@/config/axios";
import Swal from "sweetalert2";
export default {
  namespaced: true,
  state: () => ({
    all: {
      data: [],
      loading: false,
    },
    counts: {
      data: null,
      loading: false,
    },
    staffs: {
      data: [],
      error: false,
      message: "",
      page: 1,
    },
    submit: {
      loading: false,
      error: false,
      message: "",
      dialog: false,
    },
    role: {
      loading: false,
      dialog: false,
    },
    update: {
      error: false,
      loading: false,
    },
  }),
  mutations: {
    setData(state, payload) {
      state[payload.type].data = payload.data;
    },
    setLoading(state, payload) {
      state[payload.type].loading = payload.loading;
    },
    setDialog(state, payload) {
      state[payload.type].dialog = payload.dialog;
    },
    setPage(state, payload) {
      state[payload.type].page = payload.page;
    },
    setError(state, payload) {
      state[payload.type].error = payload.error;
      state[payload.type].message = payload.message;
    },
  },
  actions: {
    async editProfile({ commit }, payload) {
      commit("setLoading", { type: "update", loading: true });
      commit("setError", { type: "update", error:false });
      try {
        const { data } = await axios.post(
          `clinic/edit-personal/${payload.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("setLoading", { type: "update", loading: false });
        console.log(data.message);
        return true;
      } catch (error) {
        commit("setLoading", { type: "update", loading: false });
        const err = error.response.data.errors;
        console.log(err);
        commit("setError", { type: "update", error: err });
        return false;
      }
    },
    async createClinic({ commit, dispatch }, payload) {
      commit("setLoading", { type: "submit", loading: true });
      commit("setError", { type: "submit", error: false, message: "" });
      axios
        .post("clinic/register-clinic", payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          dispatch("staffs");
          commit("setLoading", { type: "submit", loading: false });
          commit("setDialog", { type: "submit", dialog: false });
            Swal.fire({
              title: "Success",
              text: "Successfully Created Staff",
              icon: "success",
              confirmButtonText: "close",
              showCloseButton: true,
              html: `The Username & Password is <b>${res.data.data.username} </b> <br>`,
            });
            console.log(res.data);
          })
        .catch((err) => {
          commit("setLoading", { type: "submit", loading: false });
          commit("setError", {
            type: "submit",
            error: true,
            message: err.response.data.message,
          });
          console.log(err.response.data);
        });
    },
    async getApproval({ commit }) {
      axios
        .get("clinic/get-approval", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          commit("setData", { type: "all", data: res.data.data });
          console.log("approval", res.data);
        });
    },
    async getCounts({ commit }) {
      axios
        .get("clinic/get-count", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          commit("setData", { type: "counts", data: res.data });
          console.log(res.data);
        });
    },
    async approval({ dispatch }, payload) {
      axios
        .put(
          `clinic/for-approval/${payload.data.id}`,
          {
            status: payload.status,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          dispatch("getApproval");
          dispatch("getCounts");
          console.log(res.data);
        });
    },
    async staffs({ commit }, params) {
      axios
        .get(`clinic/staff?page=${params}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          commit("setData", { type: "staffs", data: res.data.data.data });
          commit("setPage", { type: "staffs", page: res.data.data.last_page });
          console.log(res.data);
        });
    },
    async search({ commit, dispatch }, params) {
      if (!params.trim()) {
        dispatch("staffs");
        return true;
      }
      axios
        .get(`clinic/staff-search/${params}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          commit("setData", { type: "staffs", data: res.data.data });
          console.log(res.data);
        });
    },
    async delete({ dispatch, state }, payload) {
      axios
        .delete(`clinic/delete-clinic/${payload.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          dispatch("staffs", state.staffs.page);
          Swal.fire({
            title: "Success",
            text: "Successfully Deleted",
            icon: "success",
            confirmButtonText: "close",
            timer: 2000,
          });
          console.log(res.data);
        });
    },
    async changeRole({ commit, dispatch, state }, payload) {
      commit("setLoading", { type: "role", loading: true });
      axios
        .put(
          `clinic/update-role/${payload.id}`,
          { role_id: payload.role_id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          dispatch("staffs", state.staffs.page);
          commit("setDialog", { type: "role", dialog: false });
          commit("setLoading", { type: "role", loading: false });
          Swal.fire({
            title: "Success",
            text: "Successfully Change Role",
            icon: "success",
            confirmButtonText: "close",
            timer: 2000,
          });
          console.log("role", res.data.data);
        });
    },
  },
};
