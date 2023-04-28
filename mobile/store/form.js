import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import axios from "../config/axios";

const store = create((set,get) => ({
  data: [],
  loading: false,
  error: "",
  exists:true,
  checkForm: async () => {
    const token = await AsyncStorage.getItem("token");
    const {data} =await axios.get("http://192.168.1.136:8000/api/check-user-response", {
      headers: { Authorization: `Bearer ${token}` },
    });

    set({exists:data.exists})
    console.log("check",data);
  },
  setForm: async (forms) => {
    set({ loading: true });
    set({ error: "" });
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        "http://192.168.1.136:8000/api/submit-form",
        { answers: forms },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await get().checkForm()
      await get().setData()
      set({ loading: false });

      return true;
    } catch (error) {
      console.log("error", error);
      set({ loading: false });

      return false;
    }
  },
  setData: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.get(
        "http://192.168.1.136:8000/api/get-form",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ data: data.data });
      console.log("data", data.data);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default store;
