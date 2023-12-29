import { createSlice } from "@reduxjs/toolkit";

const auditSlice = createSlice({
  name: "audit",
  initialState: {
    get: {
      data: [],
      loading: false,
      error: false,
      dialog: false,
    },
    validate: {
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

export const { setData, setLoading, setError, setDialog } = auditSlice.actions;
export default auditSlice.reducer;
