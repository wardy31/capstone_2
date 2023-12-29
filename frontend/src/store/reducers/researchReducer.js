import { createSlice } from "@reduxjs/toolkit";

const researchSlice = createSlice({
  name: "research",
  initialState: {
    get: {
      data: [],
      loading: false,
      error: false,
      dialog: false,
    },
    user: {
      data: [],
      loading: false,
      error: false,
      dialog: false,
    },
    approve: {
      data: [],
      loading: false,
      error: false,
      dialog: false,
    },
    pending: {
      data: [],
      loading: false,
      error: false,
      dialog: false,
    },
    request_delete: {
      data: [],
      loading: false,
      error: false,
      dialog: false,
    },
    logs: {
      data: [],
      loading: false,
      error: false,
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
    process: {
      loading: false,
      error: false,
      dialog: false,
    },
    status: {
      loading: false,
      error: false,
      dialog: false,
    },
    view: {
      data: null,
      loading: false,
      error: false,
      dialog: false,
    },
    sync_pending: {
      data: [],
      loading: false,
    },
    delete_request: {
      loading: false,
    },
  },
  reducers: {
    setData: (state, { payload }) => {
      state[payload.type].data = payload.payload;
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

export const { setData, setLoading, setError, setDialog } =
  researchSlice.actions;
export default researchSlice.reducer;
