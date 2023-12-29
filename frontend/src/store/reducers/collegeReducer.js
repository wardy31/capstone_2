import { createSlice } from "@reduxjs/toolkit";

const collegeSlice = createSlice({
  name: "college",
  initialState: {
    get: {
      data: [],
      loading: false,
      error: false,
      dialog: false,
    },
    department: {
      data: [],
      loading: false,
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
    setDepartmentData: (state, { payload }) => {
      state.department.data = payload;
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

export const { setDepartmentData, setData, setLoading, setError, setDialog } =
  collegeSlice.actions;
export default collegeSlice.reducer;
