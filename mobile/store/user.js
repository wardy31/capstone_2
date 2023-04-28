import { create } from "zustand";
import axios from "../config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const store = create((set) => ({
  userStatus:null,
  loading: false,
  error: false,
  password: {
    loading: false,
    error: "",
  },
  setCheckStatus:async() =>{
    try{
      const token = await AsyncStorage.getItem("token");
      const {data} =await axios.get('http://192.168.1.136:8000/api/check-status',{headers:{Authorization:`Bearer ${token}`}})
      set({userStatus:data.data})
      console.log('status',data);
    }catch(e){
      console.log(e);
    }
  },
  setPassword: async (params) => {
    set({loading:true});
    set({error:""});
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.put(
        "http://192.168.1.136:8000/api/user/update-password",
        params,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({loading:false});

      console.log(token);

      return true;
    } catch (e) {
        set({loading:false});
        set({error:e.response.data.errors});
        console.log(e.response.data.errors);

      return false;
    }
  },
}));

export default store;
