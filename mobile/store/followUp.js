import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import axios from "../config/axios";

const store = create((set, get) => ({
  loading: false,
  error: "",
  exists:false,
  submitFollowUp: async (data) => {
    set({ loading: true });
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        "http://192.168.1.105:8000/api/submit-follow-up",{form:data},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await get().setData()
      set({ loading: false });
      return true;
    } catch (error) {
      console.log("error",error);
      set({ loading: false });
      return false;
    }
  },
  setData: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.get(
        "http://192.168.1.105:8000/api/followup-exist",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ exists: data.exist });
      console.log("data", data.exist);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default store;
