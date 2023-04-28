import axios from "@/config/axios";
import Swal from "sweetalert2";

export default {
    namespaced: true,
    state:() =>({
        all:{
            data:[],
            loading:false,
            page:1,
        },
        userRecord:{
            data:[],
            loading:false
        },
        submit:{
            dialog:false,
            error:false,
            message:"",
            loading:false
        },
        delete:{
            loading:false
        },
        status:{
            loading:false
        },
        credentials:{
            error:false,
            message:"",
            loading:false,
            next:false,
            user:[]
        }
    }),
    mutations:{
        setData(state,payload){
            state.all.data = payload
        },
        setLoading(state,payload){
            state[payload.type].loading = payload.loading
        },
        setDialog(state,payload){
            state.submit.dialog = payload
        },
        setError(state,payload){
            state[payload.type].error = payload.error
            state[payload.type].message = payload.message
        },
        setNext(state,payload){
            state.credentials.next= payload
        },
        setUser(state,payload){
            state.credentials.user = payload
        },
        setPage(state,payload){
            state[payload.type].page = payload.page
        }
    },
    actions:{
        async login({commit},payload){
            commit("setLoading",{type:'credentials',loading:true})
            axios.post('login-station',payload,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(res =>{
                localStorage.setItem("token", res.data.token);
                commit("setLoading",{type:'credentials',loading:false})
                commit("setNext",true)                
                console.log(res);
            }).catch(err =>{
                console.log(err.response.data.message);
                commit("setLoading",{type:'credentials',loading:false})
                commit("setError",{type:'credentials',error:true,message:err.response.data.message})
            })
        },
        async userStation({commit}){
            commit("setLoading",{type:'credentials',loading:true})
            axios.get('user-station',{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}}) 
            .then(res =>{
                commit('setUser',res.data.data);
                commit("setLoading",{type:'credentials',loading:false})
                console.log('station user',res.data.data);
            }) 
        },
        async search({commit,dispatch},params){
            if(!params.trim()){ 
                dispatch('get')
                return true
            }
            axios.get(`clinic/station-search/${params}`,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}}) 
            .then(res =>{
                commit('setData',res.data.data);
                console.log('station',res.data.data);
            }) 
            return true
        },
        async get({commit},params){
            axios.get(`clinic/get-station?page=${params}`,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}}) 
            .then(res =>{
                commit('setData',res.data.data.data);
                commit('setPage',{type:"all",page:res.data.data.last_page})
                console.log('station',res.data.data.last_page);
            }) 
        },
        async submit({commit,dispatch},payload){
            commit("setLoading",{type:'submit',loading:true})
            commit("setError",{type:"submit",error:false,message:""})
            axios.post('clinic/register-station',payload,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(res =>{
                dispatch("get")
                commit("setLoading",{type:'submit',loading:false})
                commit("setDialog",false)
                Swal.fire({
                    title: "Success",
                    text: "Successfully Created Station",
                    icon: "success",
                    confirmButtonText: "close",
                    showCloseButton: true,
                    html: `The Username & Password is <b>${res.data.data.username}`,
                  });
                console.log(res.data)
            }).catch(err =>{
                commit("setError",{type:"submit",error:true,message:err.response.data.message})
                commit("setLoading",{type:'submit',loading:false})
                console.log(err.response.data);
            })
        },
        async delete({commit,dispatch,state},payload){
            commit("setLoading",{type:"delete",loading:true})
            axios.delete(`clinic/delete-station/${payload.location_id}`,{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(res =>{
                dispatch("get",state.all.page)
                commit("setLoading",{type:"delete",loading:true})
                Swal.fire({
                    title: "Success",
                    text: "Successfully Deleted Station",
                    icon: "success",
                    confirmButtonText: "close",
                    showCloseButton: true,
                    timer:2000,
                    html: `Successfully Deleted Station <br> <b>${payload.username}</b>`,
                  });
                console.log(res.data)
            })
        },
        async changeStatus({commit,dispatch},payload){
            console.log('wew');
            commit('setLoading',{type:'status',loading:true})
            axios.put(`clinic/update-status/${payload.id}`,{is_active:payload.is_active},{headers:{"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(res =>{
                dispatch("get")
                Swal.fire({
                    title: "Success",
                    text: "Successfully Change Status",
                    icon: "success",
                    confirmButtonText: "close",
                    showCloseButton: true,
                    timer:2000,
                    html: `Successfully Change Status`,
                  });

                console.log('change status',res.data.data)
            })
        }
    }

}