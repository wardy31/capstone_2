import axios from "@/config/axios";
import Swal from 'sweetalert2'
export default {
  namespaced: true,
  state: () => ({
    all: {
      data:{},
      error: false,
      message: "",
      dialog: false,
      loading: false,
      page:1
    },
    check:{
      data:null,
      health:null,
      loading:false
    }
  }),
  mutations: {
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
    setData(state,data){
      state[data.type].data  = data.data
    },
    setPage(state,data){
      state[data.type].page  = data.page
    }
  },
  actions: {
    async followUp({ commit,dispatch }, payload) {
        commit("setLoading",true)
      axios.post("user/follow-up", payload,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(res =>{
            commit("setLoading",false)
            commit("setDialog",false)
            dispatch("checkFollowUp")
            Swal.fire({
                title: 'Success',
                text: 'Successfully Submitted',
                icon: 'success',
                confirmButtonText: 'close',
                timer: 2000
              })
            console.log(res.data)
        }).catch(err =>{
            commit("setError",{error:true,message:err.response.data.message})
            commit("setLoading",false)
            console.log(err.response.data);
        })
    },
    async checkFollowUp({commit,state}){
      axios.get('check-followup',{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
      .then(res =>{
        commit('setData',{type:'check',data:res.data})
        state.check.health = res.data.healthDeclaration
        console.log(' check followUps ',res.data);
        console.log(res.data);
      }).catch(err =>{
        console.log(err.response.data);
      })
    },
    async allFollowUp({commit},params){
      axios.get(`clinic/all-follow-ups?page=${params}`,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
      .then(res =>{
        commit('setData',{type:'all',data:res.data})
        commit('setPage',{type:'all',page:res.data.data.last_page})
        console.log('alllfollowUps',res.data);
      }).catch(err =>{
        console.log(err.response.data);
      })
    }
  },
};
