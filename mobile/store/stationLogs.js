import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const store = create((set) => ({
  loading: false,
  error: false,
  data: [],
  setData: async () => {
    set({ loading: true });

    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.get(
        "http://192.168.1.136:8000/api/user/visited-log-record",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("data", data);
      set({ data: data.data });
      set({ loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },
}));

export default store;
