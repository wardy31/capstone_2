import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const store = create((set, get) => ({
  loading: true,
  cameraLoading: false,
  error: false,
  data: 0,
  daily: 0,
  setData: async () => {
    set({ loading: true });

    try {
      const users = await AsyncStorage.getItem("user");
      const { id } = JSON.parse(users);

      const { data } = await axios.get(
        `stations/${id}/location-histories?isToday=${true}`
      );

      console.log("dailys", data);
      set({ data: data.length });
      set({ loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },
  setDaily: async (data) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await axios.get(
        `stations/${id}/location-histories`,
        { location_id: data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ daily: res.data.data.length });
      console.log("count", res.data.data.length);
    } catch (error) {
      console.log("l;ogs", error);
    }
  },
  dailyIncrement: (data) => {
    set((state) => ({ data: state.data + 1 }));
  },
}));

export default store;
