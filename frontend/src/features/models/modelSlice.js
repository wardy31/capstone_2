import { createSlice } from "@reduxjs/toolkit";

const modelSlice = createSlice({
  name: "model",
  initialState: {
    loadModel: {
      loading: false,
      success: false,
      error: false,
    },
    detectFace: {
      loading: false,
      success: false,
      error: false,
    },
  },
  reducers: {
    SET_LOADING: (state, { payload: { type, payload } }) => {
      state[type].loading = payload;
    },
    SET_SUCCESS: (state, { payload: { type, payload } }) => {
      state[type].success = payload;
    },
    SET_ERROR: (state, { payload: { type, payload } }) => {
      state[type].error = payload;
    },
  },
});

export const { SET_LOADING, SET_ERROR, SET_SUCCESS } = modelSlice.actions;
export default modelSlice.reducer;
