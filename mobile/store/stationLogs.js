import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const store = create((set) => ({
  loading: false,
  cameraLoading:false,
  error: false,
  data: [],
  daily:0,
  setData: async () => {
    set({ loading: true });

    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.get(
        "http://192.168.1.105:8000/api/user/visited-log-record",
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
  setDaily: async (data) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://192.168.1.105:8000/api/station/get-daily-visit",{location_id:data},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({daily:res.data.data.length})
      console.log('count',res.data.data.length);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default store;
