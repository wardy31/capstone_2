// import axios from "@/config/axios"
import axios from "axios"
import Swal from 'sweetalert2'
export default {
    namespaced: true,
    state: () => ({
        all: {
            data: [],
            loading: false,
            error: false
        },
        submit: {
            loading: false,
            error: false,
            message: "",
            dialog: false,
            refresh: false
        },
    }),
    mutations: {
        setLoading(state, payload) {
            state[payload.type].loading = payload.loading
        },
        setError(state, payload) {
            state[payload.type].error = payload.error
            state[payload.type].message = payload.message
        },
        setDialog(state, payload) {
            state.submit.dialog = payload
        },
        setRefresh(state, payload) {
            state.submit.refresh = payload
        }
    },
    actions: {
        async createClinic({ commit }, payload) {
            commit('setLoading', { type: "submit", loading: true })
            commit('setError', { type: "submit", error: false, message: "" })
            axios.post('http://192.168.1.136:8000/api/clinic/register-clinic', payload, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
                .then(res => {
                    commit('setLoading', { type: "submit", loading: false })
                    commit("setDialog", false)
                    commit("setRefresh", true);
                    Swal.fire({
                        title: 'Success',
                        text: 'Successfully Created Staff',
                        icon: 'success',
                        confirmButtonText: 'close',
                        showCloseButton: true,
                        html: `The Username & Password is <b>${res.data.data.username} </b> <br>`
                    })
                    console.log(res.data)
                }).catch(err => {
                    commit('setLoading', { type: "submit", loading: false })
                    commit('setError', { type: "submit", error: true, message: err.response.data.message })
                    console.log(err.response.data)
                })
        },

        async createUser({ commit }, payload) {
            commit('setLoading', { type: "submit", loading: true })
            commit('setError', { type: "submit", error: false, message: "" })

            try {
                const { data } = await axios.post(
                    `${process.env.VUE_APP_API}/register-user`,
                    payload,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                const ss = await axios.post(`${process.env.VUE_APP_NODE}/create-account/${data.data.id}`, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                commit('setLoading', { type: "submit", loading: false })
                Swal.fire({
                    title: 'Success',
                    text: 'Successfully Created',
                    icon: 'success',
                    confirmButtonText: 'close',
                    timer: 2000
                })

                console.log('data', data.data);
                console.log('data', ss);

                return true
            } catch (err) {
                commit('setLoading', { type: "submit", loading: false })
                commit('setError', { type: "submit", error: true, message: err.response.data.errors })
                console.log(err.response.data)

                return false
            }
        }
    }
}