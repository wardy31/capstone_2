import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    get: {
      data: [],
      loading: false,
      error: false,
    },
    post: {
      data: [],
      loading: false,
      error: false,
    },
    update: {
      data: [],
      loading: false,
      error: false,
    },
    delete: {
      data: [],
      loading: false,
      error: false,
    },
    department: {
      data: [],
      loading: false,
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

export const { setData, setLoading, setError } = courseSlice.actions;
export default courseSlice.reducer;
