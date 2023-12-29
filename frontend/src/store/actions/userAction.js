import axios from "../../utils/axios";
import {
  setData,
  setUser,
  setError,
  setLoading,
} from "../reducers/userReducer";
import { getStorage } from "../../utils/storage";
import { db } from "../../../db/db";

export const getUser = () => async (dispatch) => {
  dispatch(setLoading({ type: "auth", payload: true }));
  dispatch(setError({ type: "auth", payload: false }));
  try {
    let data;

    if (navigator.onLine) {
      ({ data } = await axios.get("get-user", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }));

      await db.users.clear();

      if (typeof data == "object") {
        await db.users.add(data);
      }

      console.log("online");
    } else {
      const result = await db.users.toArray();
      data = result[0];
    }

    console.log("auths", data);
    dispatch(setLoading({ type: "auth", payload: false }));
    dispatch(setUser({ type: "auth", payload: data }));
    return data;
  } catch (error) {
    dispatch(setLoading({ type: "auth", payload: false }));
    dispatch(setError({ type: "auth", payload: true }));
    return false;
  }
};

export const loginUser = (form) => async (dispatch) => {
  dispatch(setLoading({ type: "login", payload: true }));
  dispatch(setError({ type: "login", payload: false }));
  try {
    const { data } = await axios.post("/login", form);
    dispatch(setLoading({ type: "login", payload: false }));
    localStorage.setItem("token", data.token);
    return data.result;
  } catch (error) {
    dispatch(setLoading({ type: "login", payload: false }));
    dispatch(setError({ type: "login", payload: error.response.data }));
    console.log(error.response.data);
    return false;
  }
};

export const getLogs = () => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "logs" }));
  dispatch(setError({ payload: false, type: "logs" }));
  console.log("datas");
  try {
    const { data } = await axios.get(`/logs`, {
      headers: { Authorization: getStorage() },
    });
    console.log("data", data);
    dispatch(setData({ payload: data, type: "logs" }));
    dispatch(setLoading({ payload: false, type: "logs" }));
  } catch (error) {
    console.log(error);
    dispatch(setLoading({ payload: false, type: "logs" }));
    dispatch(setError({ payload: true, type: "logs" }));
  }
};

export const createUser = (form) => async (dispatch) => {
  dispatch(setLoading({ type: "create", payload: true }));
  dispatch(setError({ type: "create", payload: false }));
  try {
    const { data } = await axios.post("/create-user", form);
    dispatch(setLoading({ type: "create", payload: false }));
    return true;
  } catch (error) {
    dispatch(setLoading({ type: "create", payload: false }));
    dispatch(setError({ type: "create", payload: error.response.data }));
    console.log(error.response.data);
    return false;
  }
};

export const getCollegeDepartment = () => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "get" }));
  dispatch(setError({ payload: false, type: "get" }));
  console.log("datas");
  try {
    const { data } = await axios.get(`/colleges/departments/courses`, {
      headers: { Authorization: getStorage() },
    });
    console.log("data", data);
    dispatch(setData({ payload: data, type: "get" }));
    dispatch(setLoading({ payload: false, type: "get" }));
  } catch (error) {
    console.log(error);
    dispatch(setLoading({ payload: false, type: "get" }));
    dispatch(setError({ payload: true, type: "get" }));
  }
};

export const userEmailVerification = (token) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "emailConfirmation" }));
  dispatch(setError({ payload: false, type: "emailConfirmation" }));
  try {
    const data = await axios.post(`/email-confirmation`, { token: token });
    console.log("data", data);
    dispatch(setLoading({ payload: false, type: "emailConfirmation" }));
    return true;
  } catch (error) {
    console.log(error);
    dispatch(setLoading({ payload: false, type: "emailConfirmation" }));
    dispatch(setError({ payload: true, type: "emailConfirmation" }));
    return false;
  }
};

export const submitEmailPassword = (form) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "emailPassword" }));
  dispatch(setError({ payload: false, type: "emailPassword" }));
  try {
    const data = await axios.post(`/forgot-password`, { email: form });
    console.log("data", data);
    dispatch(setLoading({ payload: false, type: "emailPassword" }));
    return true;
  } catch (error) {
    console.log(error.response.data);
    dispatch(setLoading({ payload: false, type: "emailPassword" }));
    dispatch(setError({ payload: error.response.data, type: "emailPassword" }));
    return false;
  }
};

export const verifyPassword = (token) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "verifyPassword" }));
  dispatch(setError({ payload: false, type: "verifyPassword" }));
  try {
    const data = await axios.get(`/verify-password?token=${token}`);
    console.log("data", data);
    dispatch(setLoading({ payload: false, type: "verifyPassword" }));
    return true;
  } catch (error) {
    console.log(error.response.data);
    dispatch(setLoading({ payload: false, type: "verifyPassword" }));
    dispatch(setError({ payload: true, type: "verifyPassword" }));
    return false;
  }
};

export const changePassword = (token, form) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "changePassword" }));
  dispatch(setError({ payload: false, type: "changePassword" }));
  try {
    const data = await axios.post(`/change-password?token=${token}`, {
      password: form,
    });
    console.log("data", data);
    dispatch(setLoading({ payload: false, type: "changePassword" }));
    return true;
  } catch (error) {
    console.log("ee", error.response.data);
    dispatch(setLoading({ payload: false, type: "changePassword" }));
    dispatch(
      setError({ payload: error.response.data, type: "changePassword" })
    );
    return false;
  }
};
