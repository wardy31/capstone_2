import axios from "@/config/axios";
import Swal from "sweetalert2";
export default {
  namespaced: true,
  state: () => ({
    all: {
      data: [],
      loading: false,
      error: false,
    },
    responses: {
      data: [],
      loading: false,
      page: 1,
      total: null,
      today: null,
    },
    submit: {
      loading: false,
      error: false,
      message: "",
    },
    existForm: {
      data: [],
      exist: false,
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
    setError(state, payload) {
      state[payload.type].error = payload.error;
      state[payload.type].message = payload.message;
    },
    setTotal(state, payload) {
      state[payload.type].total = payload.total;
    },
    setToday(state, payload) {
      state[payload.type].today = payload.today;
    },
  },
  actions: {
    async getQuestions({ commit }) {
      commit("setLoading", { type: "all", loading: true });
      axios
        .get("get-form", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          commit("setData", { type: "all", data: res.data.data });
          commit("setLoading", { type: "all", loading: false });
          console.log("forms", res.data);
        });
    },
    async submitForm({ commit, dispatch }, payload) {
      commit("setLoading", { type: "submit", loading: true });
      axios
        .post(
          "submit-form",
          { answers: payload },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          commit("setLoading", { type: "submit", loading: false });
          Swal.fire({
            title: "Success",
            text: "Successfully Submitted",
            icon: "success",
            confirmButtonText: "close",
            timer: 2000,
          });

          dispatch("getQuestions");
          dispatch("checkExist");
          console.log(res.data);
        })
        .catch((err) => {
          commit("setLoading", { type: "submit", loading: false });
          console.log(err.response);
        });
    },
    async checkExist({ commit, state }) {
      axios
        .get("check-user-response", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          commit("setData", { type: "existForm", data: res.data.data });
          // commit('setLoading',{type:'all',loading:false})
          state.existForm.exist = res.data.exists;
          console.log("exist", res.data);
        });
    },
    async getSubmitted({ commit }, param) {
      axios
        .get(`get-response?page=${param}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          commit("setData", { type: "responses", data: res.data.data.data });
          commit("setPage", {
            type: "responses",
            page: res.data.data.last_page,
          });
          commit("setTotal", { type: "responses", total: res.data.total });
          commit("setToday", { type: "responses", today: res.data.today });

          console.log("exidast", res.data);
        });
    },
    async responseSearch({ commit,dispatch }, param) {
        if(!param.trim()){
            dispatch('getSubmitted')
        }
        axios
          .get(`clinic/response-search/${param}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then((res) => {
            commit("setData", { type: "responses", data: res.data.data });
            console.log("exidast", res.data);
          });
      },
  
  },
};
