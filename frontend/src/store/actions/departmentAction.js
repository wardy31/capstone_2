import { useEffect } from "react";
import axios from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { setData, setLoading, setError } from "../reducers/departmentReducer";
import { db } from "../../../db/db";

export const searchDepartment = (form) => async (dispatch) => {
  dispatch(setError({ payload: false, type: "get" }));
  try {
    const { data } = await axios.get(`admin/department?search=${form}`, {
      headers: { Authorization: getStorage() },
    });
    dispatch(setData(data));
  } catch (error) {
    dispatch(setError({ payload: true, type: "get" }));
  }
};

export const getDepartment =
  (search = "") =>
  async (dispatch) => {
    dispatch(setLoading({ payload: true, type: "get" }));
    dispatch(setError({ payload: false, type: "get" }));
    try {
      let data;
      if (navigator.onLine) {
        await db.departments.clear();

        ({ data } = await axios.get(`admin/department?search=${search}`, {
          headers: { Authorization: getStorage() },
        }));

        await db.departments.bulkAdd(data);
      } else {
        data = await db.departments.toArray();
      }
      console.log("department", data);
      dispatch(setData(data));
      dispatch(setLoading({ payload: false, type: "get" }));
    } catch (error) {
      dispatch(setLoading({ payload: false, type: "get" }));
      dispatch(setError({ payload: true, type: "get" }));
    }
  };

export const addDepartment = (form) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "post" }));
  dispatch(setError({ payload: false, type: "post" }));
  try {
    const { data } = await axios.post("admin/department", form, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getDepartment());
    dispatch(setLoading({ payload: false, type: "post" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "post" }));
    dispatch(setError({ payload: error.response.data, type: "post" }));
    return false;
  }
};

export const deleteDepartment = (id) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "delete" }));
  dispatch(setError({ payload: false, type: "delete" }));
  try {
    const { data } = await axios.delete(`admin/department/${id}`, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getDepartment());
    dispatch(setLoading({ payload: false, type: "delete" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "delete" }));
    dispatch(setError({ payload: true, type: "delete" }));
    return false;
  }
};

export const updateDepartment = (id, form) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "put" }));
  dispatch(setError({ payload: false, type: "put" }));
  try {
    const { data } = await axios.put(`admin/department/${id}`, form, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getDepartment());
    dispatch(setLoading({ payload: false, type: "put" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "put" }));
    dispatch(setError({ payload: error.response.data, type: "put" }));
    return false;
  }
};
