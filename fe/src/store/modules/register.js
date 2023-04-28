import axios from "@/config/axios"
import Swal from 'sweetalert2'
export default {
    namespaced:true,
    state:() => ({
        all:{
            data:[],
            loading:false,
            error:false
        },
        submit:{
            loading:false,
            error:false,
            message:"",
            dialog:false,
            refresh:false
        },
    }),
    mutations:{
        setLoading(state,payload){
            state[payload.type].loading = payload.loading
        },
        setError(state,payload){
            state[payload.type].error =payload.error
            state[payload.type].message =payload.message
        },
        setDialog(state,payload){
            state.submit.dialog = payload
        },
        setRefresh(state,payload){
            state.submit.refresh = payload
        }
    },
    actions:{
        async createClinic({commit},payload){
            commit('setLoading',{type:"submit",loading:true})
            commit('setError',{type:"submit",error:false,message:""})
            axios.post('clinic/register-clinic',payload,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
                .then(res =>{
                    commit('setLoading',{type:"submit",loading:false})
                    commit("setDialog",false)
                    commit("setRefresh",true);
                    Swal.fire({
                        title: 'Success',
                        text: 'Successfully Created Staff',
                        icon: 'success',
                        confirmButtonText: 'close',
                        showCloseButton: true,
                        html:`The Username & Password is <b>${res.data.data.username} </b> <br>`
                      })
                    console.log(res.data)
                }).catch(err =>{
                    commit('setLoading',{type:"submit",loading:false})
                    commit('setError',{type:"submit",error:true,message:err.response.data.message})
                    console.log (err.response.data)
                })
        },

        async createUser({commit},payload){
            commit('setLoading',{type:"submit",loading:true})
            commit('setError',{type:"submit",error:false,message:""})
            axios.post('register-user',payload)
                .then(res =>{
                    commit('setLoading',{type:"submit",loading:false})
                    Swal.fire({
                        title: 'Success',
                        text: 'Successfully Created',
                        icon: 'success',
                        confirmButtonText: 'close',
                        timer: 2000
                      })
                    console.log(res.data)
                }).catch(err =>{
                    commit('setLoading',{type:"submit",loading:false})
                    commit('setError',{type:"submit",error:true,message:err.response.data.message})
                    console.log (err.response.data)
                })
        }
    }
}