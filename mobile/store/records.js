import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const link = "https://laravel.lnucontacttracing.online"
const store = create((set) => ({
  loading: false,
  error: false,
  data: [],
  setData: async () => {
    set({ loading: true });
    try {
      const { id } = JSON.parse(await AsyncStorage.getItem("user"));
      console.log("id", id);
      const { data } = await axios.get(`stations/${id}/location-histories`);

      console.log("data", data);
      set({ data: data });
      set({ loading: false });

      return true;
    } catch (error) {
      console.log("station Error",error.response);
      set({ loading: false });

      return false;
    }
  },
}));

export default store;
