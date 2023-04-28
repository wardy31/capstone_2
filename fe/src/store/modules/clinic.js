import axios from "@/config/axios";

export default {
  namespaced: true,
  state: () => ({
    credentials: {
      data: null,
      loading: false,
      error: false,
      next: false,
      success:false,
      message: "",
      back:false
    },
    role:[]
  }),
  mutations: {
    setData(state, payload) {
      state[payload.type].data = payload.data;
    },
    next(state, data) {
      state.credentials.next = data;
    },
    setBack(state,data){
      state.credentials.back = data
    },
    setLoading(state, payload) {
      state[payload.type].loading = payload.loading;
    },
    setError(state, payload) {
      state[payload.type].error = payload.error;
      state[payload.type].message = payload.message;
    },
    setRole(state,payload){
      state.role = payload
    },
    setSuccess(state,payload){
      state.credentials.success = payload
    }
  },
  actions: {
    async changePassword ({commit},params){
      commit('setError',{type:"credentials",error:null})
      commit('setSuccess',false)
      axios.post(`clinic/change-password/${params.id}`,params.forms,{headers:{
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }}).then(res =>{
          commit('setSuccess',true)
          console.log(res);
          console.log(commit);
      }).catch(err =>{
        console.log(err.response);
        commit('setError',{type:"credentials",error:err.response.data.errors})
      })
    },
    async getRole({commit}){
      axios.get('clinic/role',{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}}).then(res =>{
        commit("setRole",res.data.data)
        console.log('role',res.data.data);
      })
    },
    async getUser({ commit }) {
      commit("setLoading", {type:"credentials",loading:true});
      axios.get("user-clinic",{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}}).then((res) => {
        commit("setData", { type: "credentials", data: res.data.data });
        commit("setLoading", {type:"credentials",loading:false});
        console.log(res.data.data);
      }).catch(() =>{
        commit("setLoading", {type:"credentials",loading:false});
        localStorage.removeItem('token')
      });
    },
    async loadUser({ commit }) {
      axios.get("user-clinic",{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}}).then((res) => {
        commit("setData", { type: "credentials", data: res.data.data });
        console.log(res.data.data);
      }).catch(() =>{
        localStorage.removeItem('token')
      });
    },
    async login({ commit }, payload) {
      commit("setLoading", { type: "credentials", loading: true });
      commit("setError", { type: "credentials", error: false, message: " " });
      axios
        .post("login-clinic", payload)
        .then((res) => {
          commit("setData", { type: "credentials", data: res.data.data });
          localStorage.setItem("token", res.data.token);
          commit("next", true);
          commit("setLoading", { type: "credentials", loading: false });
          console.log(res.data);
        })
        .catch((err) => {
          commit("setLoading", { type: "credentials", loading: false });
          commit("setError", {
            type: "credentials",
            error: true,
            message: err.response.data.message,
          });
          console.log(err.response.data);
        });
    },
    async reset({ commit }) {
      commit("next", false);
    },
  },
};
