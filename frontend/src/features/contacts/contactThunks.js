import axios from "../../utils/axios";

import { SET_DATA, SET_ERROR, SET_LOADING } from "./contactSlice";

export const getUser = () => async (dispatch) => {
  dispatch(SET_LOADING({ type: "users", payload: true }));
  dispatch(SET_ERROR({ type: "users", payload: false }));
  try {
    const { data } = await axios.get("users");
    dispatch(SET_DATA({ type: "users", payload: data }));
    dispatch(SET_LOADING({ type: "users", payload: false }));
  } catch (error) {
    dispatch(SET_ERROR({ type: "users", payload: true }));
    dispatch(SET_LOADING({ type: "users", payload: false }));
  }
};
