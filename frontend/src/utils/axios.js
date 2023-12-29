import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BE_HOST;

export default axios;
