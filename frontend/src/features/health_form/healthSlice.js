import { createSlice } from "@reduxjs/toolkit";

const healthSlice = createSlice({
  name: "health",
  initialState: {
    getRecords: {
      data: [],
      loading: true,
      error: false,
    },
    getQuestions: {
      data: [],
      loading: true,
      error: false,
    },
    createQuestion: {
      loading: false,
      error: false,
    },
    updateQuestion: {
      loading: false,
      error: false,
    },
    deleteQuestion: {
      loading: false,
      error: false,
    },
    userResponse: {
      data: [],
      loading: true,
    },
    formSubmit: {
      data: [],
      loading: false,
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

export const { SET_DATA, SET_ERROR, SET_LOADING } = healthSlice.actions;
export default healthSlice.reducer;
