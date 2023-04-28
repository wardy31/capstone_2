import { create } from "zustand";

const ImageStore = create((set) => ({
  upload1: "",
  upload2: "",
  setData: (param, key) => set({[key]:param}),
  setClean:() =>{
    set({upload1:""})
    set({upload2:""})
  }
}));

export default ImageStore;
