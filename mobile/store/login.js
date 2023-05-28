import { create } from "zustand";
import axios from "../config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const store = create((set,get) => ({
  authCheck:false,
  loading: false,
  error: false,
  user:{},
  url:"",
  setLogin: async (params) => {
    set({ loading: true });
    set({ error: "" });
    try {
      const { data } = await axios.post(
        "http://192.168.1.136:8000/api/login-user",
        params
      );
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.data));
      await AsyncStorage.setItem('url',data.url)
      await get().setUser()
      set({ loading: false });

      console.log("result", data.token);
      console.log('ur',data.url);
      return true;
    } catch (error) {
      set({ error: error.response.data.errors });
      set({ loading: false });
      console.log(error.response);
      return false;
    }
  },
  setStation: async (params) => {
    set({ loading: true });
    set({ error: "" });
    try {
      const { data } = await axios.post(
        "https://laravel.lnucontacttracing.online/api/login-station",
        params
      );
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.data));
      await AsyncStorage.setItem('url',data.url)
      await get().setUser()
      set({ loading: false });

      console.log("result", data.token);
      console.log('ur',data.url);
      return true;
    } catch (error) {
      set({ error: error.response.data.errors });
      console.log(error.response.data.errors);
      set({ loading: false });
      return false;
    }
  },
  setUser:async () =>{
    const res = await AsyncStorage.getItem('user')
    const urls =await AsyncStorage.getItem('url')
    set({user:JSON.parse(res)})
    set({url:urls})    
  },
  setLogout:async () =>{
    set({loading:true})
    try{
        const token = await AsyncStorage.getItem("token")
        await axios.post("https://laravel.lnucontacttracing.online/api/logout",{},{headers:{"Authorization" : `Bearer ${token}`}})
        await AsyncStorage.clear()
        set({loading:false})
        set(state => ({authCheck:!state.authCheck}))
        return true
    }catch(e){
        console.log(e);
        set({loading:false})

        return false
    }
  }
}));

export default store;
