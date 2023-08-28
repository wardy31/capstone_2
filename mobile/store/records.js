import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const link = "http://192.168.1.105:8000"
// const link = "https://laravel.lnucontacttracing.online"
const store = create((set) => ({
  loading: false,
  error: false,
  data: [],
  setData: async () => {
    set({ loading: true });
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.get(
        `${link}/api/station/get-visitor-station`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("data", data);
      set({ data: data.data });
      set({ loading: false });

      return true
    } catch (error) {
      console.log(error);
      set({ loading: false });

      return false
    }
  },
}));

export default store;
