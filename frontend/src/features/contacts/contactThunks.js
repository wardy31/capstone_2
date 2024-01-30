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

export const getInfectedUsers = () => async (dispatch) => {
  dispatch(SET_LOADING({ type: "infectedUsers", payload: true }));
  dispatch(SET_ERROR({ type: "infectedUsers", payload: false }));
  try {
    const { data } = await axios.get("infected-users");
    dispatch(SET_DATA({ type: "infectedUsers", payload: data }));
    dispatch(SET_LOADING({ type: "infectedUsers", payload: false }));
  } catch (error) {
    dispatch(SET_ERROR({ type: "infectedUsers", payload: true }));
    dispatch(SET_LOADING({ type: "infectedUsers", payload: false }));
  }
};

export const getInfectedUsersById = (id) => async (dispatch) => {
  dispatch(SET_LOADING({ type: "infectedUserById", payload: true }));
  dispatch(SET_ERROR({ type: "infectedUserById", payload: false }));
  try {
    const { data } = await axios.get(`infected-users/${id}`);
    dispatch(SET_DATA({ type: "infectedUserById", payload: data }));
    dispatch(SET_LOADING({ type: "infectedUserById", payload: false }));
  } catch (error) {
    dispatch(SET_ERROR({ type: "infectedUserById", payload: true }));
    dispatch(SET_LOADING({ type: "infectedUserById", payload: false }));
  }
};

export const removeInfectedUsers = (form) => async (dispatch) => {
  dispatch(SET_LOADING({ type: "removeInfected", payload: true }));
  dispatch(SET_ERROR({ type: "removeInfected", payload: false }));
  try {
    const { data } = await axios.delete(`infected-users/${form.id}`);
    dispatch(SET_DATA({ type: "removeInfected", payload: data }));
    dispatch(SET_LOADING({ type: "removeInfected", payload: false }));

    await dispatch(getInfectedUsers());
  } catch (error) {
    dispatch(SET_ERROR({ type: "removeInfected", payload: true }));
    dispatch(SET_LOADING({ type: "removeInfected", payload: false }));
  }
};

export const updateStatusInfected = (form) => async (dispatch) => {
  dispatch(SET_LOADING({ type: "editInfected", payload: true }));
  dispatch(SET_ERROR({ type: "editInfected", payload: false }));
  try {
    const { data } = await axios.put(`infected-users/${form.id}`, form);
    dispatch(SET_LOADING({ type: "editInfected", payload: false }));

    await dispatch(getInfectedUsers());
  } catch (error) {
    dispatch(SET_ERROR({ type: "editInfected", payload: true }));
    dispatch(SET_LOADING({ type: "editInfected", payload: false }));
  }
};
