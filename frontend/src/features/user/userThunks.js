import axios from "../../utils/axios";
import { SET_DATA, SET_ERROR, SET_LOADING } from "./userSlice";

export const createUser = (forms) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "createUser", payload: true }));
    dispatch(SET_ERROR({ type: "createUser", payload: false }));

    const { data } = await axios.post("create-user", forms);

    console.log(data);
    dispatch(SET_LOADING({ type: "createUser", payload: false }));
  } catch (error) {
    dispatch(SET_LOADING({ type: "createUser", payload: false }));
    dispatch(SET_ERROR({ type: "createUser", payload: true }));
  }
};

export const getUsers = (forms) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "getUser", payload: true }));
    dispatch(SET_ERROR({ type: "getUser", payload: false }));

    const { data } = await axios.get("users", forms);
    dispatch(SET_DATA({ type: "getUser", payload: data }));
    dispatch(SET_LOADING({ type: "getUser", payload: false }));
  } catch (error) {
    dispatch(SET_LOADING({ type: "getUser", payload: false }));
    dispatch(SET_ERROR({ type: "getUser", payload: true }));
  }
};

export const getUserHealthRecords = (id) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "userHealthRecord", payload: true }));
    dispatch(SET_ERROR({ type: "userHealthRecord", payload: false }));

    const { data } = await axios.get(`/users/${id}/responses`);
    console.log("data", data);
    dispatch(SET_DATA({ type: "userHealthRecord", payload: data }));
    dispatch(SET_LOADING({ type: "userHealthRecord", payload: false }));
  } catch (error) {
    dispatch(SET_LOADING({ type: "userHealthRecord", payload: false }));
    dispatch(SET_ERROR({ type: "userHealthRecord", payload: true }));
  }
};

export const getUserLocations = (id) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "userLocation", payload: true }));
    dispatch(SET_ERROR({ type: "userLocation", payload: false }));

    const { data } = await axios.get(`/users/${id}/location-histories`);
    dispatch(SET_DATA({ type: "userLocation", payload: data }));
    dispatch(SET_LOADING({ type: "userLocation", payload: false }));
  } catch (error) {
    dispatch(SET_LOADING({ type: "userLocation", payload: false }));
    dispatch(SET_ERROR({ type: "userLocation", payload: true }));
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "userById", payload: true }));
    dispatch(SET_ERROR({ type: "userById", payload: false }));

    const { data } = await axios.get(`/users/${id}`);
    dispatch(SET_DATA({ type: "userById", payload: data }));
    dispatch(SET_LOADING({ type: "userById", payload: false }));
  } catch (error) {
    dispatch(SET_LOADING({ type: "userById", payload: false }));
    dispatch(SET_ERROR({ type: "userById", payload: true }));
  }
};

export const getUserLogs = (id) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "userById", payload: true }));
    dispatch(SET_ERROR({ type: "userById", payload: false }));

    const { data } = await axios.get(`/users/${id}`);
    dispatch(SET_DATA({ type: "userById", payload: data }));
    dispatch(SET_LOADING({ type: "userById", payload: false }));
  } catch (error) {
    dispatch(SET_LOADING({ type: "userById", payload: false }));
    dispatch(SET_ERROR({ type: "userById", payload: true }));
  }
};
