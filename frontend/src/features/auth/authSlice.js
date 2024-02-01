import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    getUser: {
      data: null,
      loading: true,
      error: false,
    },
    login: {
      data: null,
      loading: false,
      error: [],
    },
    notifications: {
      data: [],
      notify: false,
      loading: true,
    },
  },
  reducers: {
    SET_DATA: (state, { payload: { type, payload } }) => {
      state[type].data = payload;
    },
    SET_LOADING: (state, { payload: { type, payload } }) => {
      state[type].loading = payload;
    },
    SET_ERROR: (state, { payload: { type, payload } }) => {
      state[type].error = payload;
    },
  },
});

export const { SET_DATA, SET_LOADING, SET_ERROR } = authSlice.actions;
export default authSlice.reducer;
