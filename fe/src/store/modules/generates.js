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
      page:1,
      allContacts:null
    },
    submit:{
        data:[],
        loading:false
    },
    taggeds:{
        data:[],
        loading:false
    }
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
    setContacts(state,data){
      state.all.allContacts = data
    }
  },
  actions: {
    async getPatient({ commit }) {
      commit("setLoading", true);
      axios
        .get(`clinic/get-all-patient`,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then((res) => {
          const { data,active_patient } = res.data;
          commit("setLoading", false);
          commit("setData", { type: "all", data: data });
          commit('setContacts', active_patient)
          console.log('patient',data);
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
    async getDatePatient({ commit },params) {
        commit("setLoading", true);
        axios
          .post(`clinic/get-date-patients`,params,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
          .then((res) => {
            const { data,active_patient } = res.data;
            commit("setLoading", false);
            commit("setData", { type: "all", data: data });
            commit('setContacts', active_patient)
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
    async submittedResponse({ commit }) {
      commit("setLoading", true);
      axios
        .get(`get-all-response`,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then((res) => {
          const { data } = res.data;
        //   commit("setLoading", false);
          commit("setData", { type: "submit", data: data });
          console.log("contactss", data);
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
    async dateResponse({ commit },params) {
      commit("setLoading", true);
      axios
        .post(`get-date-response`,params,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then((res) => {
          const { data } = res.data;
        //   commit("setLoading", false);
          commit("setData", { type: "submit", data: data });
          console.log("contactss", data);
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
    async getTaggeds({ commit },params) {
        commit("setLoading", true);
        axios
          .post(`clinic/get-all-contacts`,params,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
          .then((res) => {
            const { data } = res.data;
          //   commit("setLoading", false);
            commit("setData", { type: "taggeds", data: data });
            console.log("taggeds", data);
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
    async getDateTaggeds({ commit },params) {
        commit("setLoading", true);
        axios
          .post(`clinic/get-date-contacts`,params,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
          .then((res) => {
            const { data } = res.data;
          //   commit("setLoading", false);
            commit("setData", { type: "taggeds", data: data });
            console.log("taggeds", data);
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

  },
};
