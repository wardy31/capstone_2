import { create } from "zustand";
import axios from "../config/axios";

const store = create((set) => ({
  loading: false,
  success: false,
  error: "",
  setSubmit: async (param) => {
    console.log("param", param);
    set({ loading: true });
    set({ error: "" });
    try {
      const { data } = await axios.post(
        "http://192.168.1.136:8000/api/register-user",
        param,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const ss = await axios.post(`http://192.168.1.136:3000/api/create-account/${data.data.id}`, param, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      await set({ loading: false });
      console.log("data", data.data);
      console.log("url",data.url);
      console.log("files", ss.data);
      return true;
    } catch (e) {
      console.log("error", e.response.data.errors);
      console.log("error", e);
      set({ loading: false });
      set({ error: e.response.data.errors });
      return false;
    }
  },
}));

export default store;
