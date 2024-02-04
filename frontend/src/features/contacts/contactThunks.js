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

export const getInfectedUsers =
  (status = "") =>
  async (dispatch) => {
    dispatch(SET_LOADING({ type: "infectedUsers", payload: true }));
    dispatch(SET_ERROR({ type: "infectedUsers", payload: false }));
    try {
      const { data } = await axios.get(`infected-users?status=${status}`);
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
    return true;
  } catch (error) {
    dispatch(SET_ERROR({ type: "removeInfected", payload: true }));
    dispatch(SET_LOADING({ type: "removeInfected", payload: false }));
    return false;
  }
};

export const updateStatusInfected = (form) => async (dispatch) => {
  dispatch(SET_LOADING({ type: "editInfected", payload: true }));
  dispatch(SET_ERROR({ type: "editInfected", payload: false }));
  try {
    const { data } = await axios.put(`infected-users/${form.id}`, form);
    dispatch(SET_LOADING({ type: "editInfected", payload: false }));

    await dispatch(getInfectedUsers());

    return true;
  } catch (error) {
    dispatch(SET_ERROR({ type: "editInfected", payload: true }));
    dispatch(SET_LOADING({ type: "editInfected", payload: false }));
    return false;
  }
};

export const updateStatusContacts = (form, infectedId) => async (dispatch) => {
  dispatch(SET_LOADING({ type: "editContacts", payload: true }));
  dispatch(SET_ERROR({ type: "editContacts", payload: false }));
  try {
    const { data } = await axios.put(`exposed-users/${form.id}`, form);
    dispatch(SET_LOADING({ type: "editContacts", payload: false }));

    await dispatch(getInfectedUsersById(infectedId));
    return true;
  } catch (error) {
    dispatch(SET_ERROR({ type: "editContacts", payload: true }));
    dispatch(SET_LOADING({ type: "editContacts", payload: false }));
    return false;
  }
};

export const getContactUsers =
  (id, { positiveDate, windowDate, stationId }) =>
  async (dispatch) => {
    dispatch(SET_LOADING({ type: "contactUsers", payload: true }));
    dispatch(SET_ERROR({ type: "contactUsers", payload: false }));
    try {
      const {
        data: { usersContact, userVisit },
      } = await axios.get(
        `/users/${id}/trace-contacts?positiveDate=${positiveDate}&windowDate=${windowDate}&stationId=${stationId}`
      );

      console.log(userVisit);
      dispatch(SET_DATA({ type: "contactUsers", payload: usersContact }));
      dispatch(SET_DATA({ type: "contactVisited", payload: userVisit }));
      dispatch(SET_LOADING({ type: "contactUsers", payload: false }));
    } catch (error) {
      dispatch(SET_ERROR({ type: "contactUsers", payload: true }));
      dispatch(SET_LOADING({ type: "contactUsers", payload: false }));
    }
  };

export const addContactUsers = (id, form) => async (dispatch) => {
  dispatch(SET_LOADING({ type: "createContactUser", payload: true }));
  dispatch(SET_ERROR({ type: "createContactUser", payload: false }));
  try {
    const { data } = await axios.post(`/infected-users/${id}/users`, form);
    dispatch(SET_LOADING({ type: "createContactUser", payload: false }));

    await dispatch(getInfectedUsersById(id));

    return true;
  } catch (error) {
    dispatch(SET_ERROR({ type: "createContactUser", payload: true }));
    dispatch(SET_LOADING({ type: "createContactUser", payload: false }));
    return false;
  }
};

export const deleteContactUsers = (form, id) => async (dispatch) => {
  dispatch(SET_LOADING({ type: "deleteContactUser", payload: true }));
  dispatch(SET_ERROR({ type: "deleteContactUser", payload: false }));
  try {
    const { data } = await axios.delete(`/exposed-users/${form.id}`);
    dispatch(SET_LOADING({ type: "deleteContactUser", payload: false }));

    await dispatch(getInfectedUsersById(id));

    return true;
  } catch (error) {
    dispatch(SET_ERROR({ type: "deleteContactUser", payload: true }));
    dispatch(SET_LOADING({ type: "deleteContactUser", payload: false }));
    return false;
  }
};
