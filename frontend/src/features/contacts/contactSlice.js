import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    users: {
      data: [],
      loading: true,
      error: false,
    },
    infectedUsers: {
      data: [],
      loading: true,
      error: false,
    },
    removeInfected: {
      data: [],
      loading: false,
      error: false,
    },
    editInfected: {
      data: [],
      loading: false,
      error: false,
    },
    infectedUserById: {
      data: null,
      loading: true,
      error: false,
    },
  },
  reducers: {
    SET_DATA: (state, { payload: { payload, type } }) => {
      state[type].data = payload;
    },
    SET_LOADING: (state, { payload: { payload, type } }) => {
      state[type].loading = payload;
    },
    SET_ERROR: (state, { payload: { payload, type } }) => {
      state[type].error = payload;
    },
  },
});

export const { SET_DATA, SET_LOADING, SET_ERROR } = contactSlice.actions;
export default contactSlice.reducer;
