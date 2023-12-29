import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    auth: {
      data: null,
      loading: false,
      error: false,
    },
    login: {
      data: null,
      loading: false,
      error: false,
    },
    create: {
      data: null,
      loading: false,
      error: false,
    },
    get: {
      data: [],
      loading: false,
      error: false,
    },
    emailConfirmation: {
      loading: false,
      error: false,
    },
    emailPassword: {
      loading: false,
      error: false,
    },
    verifyPassword: {
      loading: true,
      error: false,
    },
    changePassword: {
      loading: false,
      error: false,
    },
    logs: {
      data: [],
      loading: false,
    },
  },
  reducers: {
    setData: (state, { payload }) => {
      return {
        ...state,
        [payload.type]: {
          ...state[payload.type],
          data: payload.payload,
        },
      };
    },
    setUser: (state, { payload }) => {
      return {
        ...state,
        [payload.type]: {
          ...state[payload.type],
          data: payload.payload,
        },
      };
    },
    setLoading: (state, { payload }) => {
      return {
        ...state,
        [payload.type]: {
          ...state[payload.type],
          loading: payload.payload,
        },
      };
    },
    setError: (state, { payload }) => {
      return {
        ...state,
        [payload.type]: {
          ...state[payload.type],
          error: payload.payload,
        },
      };
    },
  },
});

export const { setUser, setLoading, setError, setData } = userSlice.actions;
export default userSlice.reducer;
