import axios from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { SET_LOADING, SET_ERROR, SET_DATA } from "./authSlice";

export const getAuth = () => async (dispatch) => {
  try {
    dispatch(SET_ERROR({ type: "getUser", payload: false }));
    dispatch(SET_LOADING({ type: "getUser", payload: true }));
    const { data } = await axios.get("auth-user", {
      headers: {
        Authorization: getStorage(),
      },
    });

    dispatch(SET_DATA({ type: "getUser", payload: data }));
    dispatch(SET_LOADING({ type: "getUser", payload: false }));
  } catch (error) {
    dispatch(SET_ERROR({ type: "getUser", payload: true }));
    dispatch(SET_LOADING({ type: "getUser", payload: false }));
  }
};

export const getNotifications = () => async (dispatch) => {
  try {
    dispatch(SET_ERROR({ type: "notifications", payload: false }));
    dispatch(SET_LOADING({ type: "notifications", payload: true }));
    const { data } = await axios.get("notifications", {
      headers: {
        Authorization: getStorage(),
      },
    });

    dispatch(SET_DATA({ type: "notifications", payload: data }));
    dispatch(SET_LOADING({ type: "notifications", payload: false }));
  } catch (error) {
    dispatch(SET_ERROR({ type: "notifications", payload: true }));
    dispatch(SET_LOADING({ type: "notifications", payload: false }));
  }
};

export const loginUser = (form) => async (dispatch) => {
  try {
    dispatch(SET_ERROR({ type: "login", payload: false }));
    dispatch(SET_LOADING({ type: "login", payload: true }));
    const { data } = await axios.post("login", form, {
      headers: {
        Authorization: getStorage(),
      },
    });

    await localStorage.setItem("token", data);
    dispatch(SET_DATA({ type: "login", payload: data }));
    dispatch(SET_LOADING({ type: "login", payload: false }));
  } catch (error) {
    console.log(error.response.data.details);
    dispatch(
      SET_ERROR({ type: "login", payload: error.response.data.details })
    );
    dispatch(SET_LOADING({ type: "login", payload: false }));
  }
};
