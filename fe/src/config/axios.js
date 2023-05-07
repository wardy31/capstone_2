import axios from "axios";

//const token = localStorage.getItem("token");

const refresh = () => {
  return localStorage.getItem("token");
};

axios.defaults.baseURL = process.env.VUE_APP_API;
// axios.defaults.baseURL = "http://127.0.0.1:8000/api";
// axios.defaults.baseURL = "http://192.168.127.138:8000/api";

axios.interceptors.request.use(
  function (config) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${refresh()}`;
    axios.defaults.withCredentials = true;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
