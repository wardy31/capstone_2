import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    get: {
      data: [],
      loading: false,
      error: false,
      dialog: false,
    },
    post: {
      loading: false,
      error: false,
      dialog: false,
    },
    put: {
      loading: false,
      error: false,
      dialog: false,
    },
    delete: {
      loading: false,
      error: false,
      dialog: false,
    },
  },
  reducers: {
    setData: (state, { payload }) => {
      state.get.data = payload;
    },
    setLoading: (state, { payload }) => {
      state[payload.type].loading = payload.payload;
    },
    setError: (state, { payload }) => {
      state[payload.type].error = payload.payload;
    },
    setDialog: (state, { payload }) => {
      state[payload.type].dialog = payload.payload;
    },
  },
});

export const { setData, setDialog, setLoading, setError } =
  departmentSlice.actions;
export default departmentSlice.reducer;
