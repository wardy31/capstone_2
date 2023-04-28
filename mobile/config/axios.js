import axios from "axios";
import storage from "@react-native-async-storage/async-storage";

const getData = async () => {
  try {
    const jsonValue = await storage.getItem("token");
    console.log('token',jsonValue);
    return jsonValue;
  } catch (e) {
    console.log('local',e);
  }
};

axios.defaults.headers.common["Authorization"] = `Bearer ${getData()}`;


export default axios