import { create } from "zustand";
import configAxios from "../config/axios";

// const link = "https://laravel.lnucontacttracing.online"
const model = create((set) => ({
  loading: false,
  error: false,
  data: [],
  setData: async () => {
    set({ loading: true });
    try {
      const { data } = await configAxios.get(`load-models`);

      console.log("model loading", data);
      set({ data: data });
      set({ loading: false });

      return true;
    } catch (error) {
      console.log("EROR NAYAWA KA", error);
      set({ loading: false });

      return false;
    }
  },
  setImage: async (forms) => {
    set({ loading: true });
    try {
      const { data } = await configAxios.post(`location-histories`, forms);

      console.log("model loading", data);
      set({ data: data });
      set({ loading: false });

      return true;
    } catch (error) {
      console.log("EROR NAYAWA KA", error);
      set({ loading: false });

      return false;
    }
  },
}));

export default model;
