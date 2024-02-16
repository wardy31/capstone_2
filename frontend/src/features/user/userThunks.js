import axios from "../../utils/axios";
import { SET_DATA, SET_ERROR, SET_LOADING, SET_NOTIFY } from "./userSlice";

export const createUser = (forms) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "createUser", payload: true }));
    dispatch(SET_ERROR({ type: "createUser", payload: false }));

    const { data } = await axios.post("create-user", forms);

    console.log(data);
    dispatch(SET_LOADING({ type: "createUser", payload: false }));
    return true;
  } catch (error) {
    dispatch(SET_LOADING({ type: "createUser", payload: false }));
    dispatch(
      SET_ERROR({ type: "createUser", payload: error.response.data.details })
    );
    return false;
  }
};

export const getUsers =
  (search = "", forms) =>
  async (dispatch) => {
    try {
      dispatch(SET_LOADING({ type: "getUser", payload: true }));
      dispatch(SET_ERROR({ type: "getUser", payload: false }));

      const { data } = await axios.get(`users?search=${search}`, forms);
      dispatch(SET_DATA({ type: "getUser", payload: data }));
      dispatch(SET_LOADING({ type: "getUser", payload: false }));
    } catch (error) {
      dispatch(SET_LOADING({ type: "getUser", payload: false }));
      dispatch(SET_ERROR({ type: "getUser", payload: true }));
    }
  };

export const removeUser = (id) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "remove", payload: true }));
    dispatch(SET_ERROR({ type: "remove", payload: false }));

    const { data } = await axios.delete(`/users/${id}`);
    console.log("data", data);
    dispatch(SET_DATA({ type: "remove", payload: data }));
    dispatch(SET_LOADING({ type: "remove", payload: false }));
    await dispatch(getUsers());
  } catch (error) {
    dispatch(SET_LOADING({ type: "remove", payload: false }));
    dispatch(SET_ERROR({ type: "remove", payload: true }));
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

export const getAllUsers = (id) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "allUsers", payload: true }));
    dispatch(SET_ERROR({ type: "allUsers", payload: false }));

    const { data } = await axios.get(`/users`);
    dispatch(SET_DATA({ type: "allUsers", payload: data }));
    dispatch(SET_LOADING({ type: "allUsers", payload: false }));
  } catch (error) {
    dispatch(SET_LOADING({ type: "allUsers", payload: false }));
    dispatch(SET_ERROR({ type: "allUsers", payload: true }));
  }
};

export const createInfectedUser = (form) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "createInfected", payload: true }));
    dispatch(SET_ERROR({ type: "createInfected", payload: false }));

    const { data } = await axios.post(`/infected-users`, form);
    dispatch(SET_LOADING({ type: "createInfected", payload: false }));
    return true;
  } catch (error) {
    dispatch(SET_LOADING({ type: "createInfected", payload: false }));
    dispatch(SET_ERROR({ type: "createInfected", payload: true }));
    return false;
  }
};

export const getNotifications = (id) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "notification", payload: true }));
    dispatch(SET_ERROR({ type: "notification", payload: false }));

    const { data } = await axios.get(`/notifications`);
    dispatch(SET_DATA({ type: "notification", payload: data }));
    dispatch(SET_LOADING({ type: "notification", payload: false }));
  } catch (error) {
    dispatch(SET_LOADING({ type: "notification", payload: false }));
    dispatch(SET_ERROR({ type: "notification", payload: true }));
  }
};

export const notifyClinic = (isActive) => async (dispatch) => {
  dispatch(dispatch(SET_NOTIFY({ type: "notification", payload: isActive })));
};

export const onUpdateProfile = (form) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "updateProfile", payload: true }));
    dispatch(SET_ERROR({ type: "updateProfile", payload: false }));

    const { data } = await axios.put(`users/${form.id}`, form);
    dispatch(SET_DATA({ type: "updateProfile", payload: data }));
    dispatch(SET_LOADING({ type: "updateProfile", payload: false }));

    return true;
  } catch (error) {
    dispatch(SET_LOADING({ type: "updateProfile", payload: false }));
    dispatch(SET_ERROR({ type: "updateProfile", payload: true }));

    return false;
  }
};

export const onUpdatePassword = (form) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "updatePassword", payload: true }));
    dispatch(SET_ERROR({ type: "updatePassword", payload: false }));

    const { data } = await axios.put(`users/${form.id}/password`, form);
    console.log("password", data);
    dispatch(SET_DATA({ type: "updatePassword", payload: data }));
    dispatch(SET_LOADING({ type: "updatePassword", payload: false }));

    return true;
  } catch (error) {
    dispatch(SET_LOADING({ type: "updatePassword", payload: false }));
    dispatch(SET_ERROR({ type: "updatePassword", payload: true }));

    return false;
  }
};
