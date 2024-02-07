import { create } from "zustand";
import configAxios from "../config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const link = "https://laravel.lnucontacttracing.online";

const store = create((set, get) => ({
  authCheck: false,
  loading: false,
  error: [],
  user: {},
  url: "",
  setLogin: async (params) => {
    set({ loading: true });
    set({ error: "" });
    try {
      const { data } = await axios.post(`${link}/api/v2/login-station`, params);
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.data));
      await AsyncStorage.setItem("url", data.url);
      await get().setUser();
      set({ loading: false });

      console.log("result", data.token);
      return true;
    } catch (error) {
      set({ error: error.response.data });
      set({ loading: false });
      console.log(error);
      return false;
    }
  },
  setStation: async (params) => {
    set({ loading: true });
    set({ error: [] });
    try {
      const { data } = await configAxios.post(`login-station`, params);
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.data));
      // await AsyncStorage.setItem("url", data.url);
      await get().setUser();
      set({ loading: false });

      console.log("result", data.token);
      console.log("ur", data);
      return true;
    } catch (error) {
      set({ error: error.response.data.details });
      console.log(error.response?.data?.details);
      set({ loading: false });
      return false;
    }
  },
  setUser: async () => {
    const res = await AsyncStorage.getItem("user");
    set({ user: JSON.parse(res) });
  },

  setLogout: async () => {
    set({ loading: true });
    try {
      await AsyncStorage.clear();
      set({ loading: false });
      set((state) => ({ authCheck: !state.authCheck }));
      return true;
    } catch (e) {
      console.log(e);
      set({ loading: false });

      return false;
    }
  },
}));

export default store;
