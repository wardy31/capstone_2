import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: {
      data: {},
      loading: false,
    },
    login: {
      loading: false,
      error: false,
    },
  },
  reducers: {
    setData: (state, { payload: { payload, type } }) => {
      state[type].data = payload;
    },
    setLoading: (state, { payload: { payload, type } }) => {
      state[type].loading = payload;
    },
    setError: (state, { payload: { payload, type } }) => {
      state[type].error = payload;
    },
  },
});

export const { setData, setError, setLoading } = authSlice.actions;
export default authSlice.reducer;

