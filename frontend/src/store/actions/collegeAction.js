import { db } from "../../../db/db";
import axios from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import {
  setData,
  setLoading,
  setError,
  setDepartmentData,
} from "../reducers/collegeReducer";

export const searchCollege = (form) => async (dispatch) => {
  try {
    const { data } = await axios.get(`admin/college?search=${form}`, {
      headers: { Authorization: getStorage() },
    });
    dispatch(setData(data));
  } catch (error) {
    dispatch(setError({ payload: true, type: "get" }));
  }
};

export const getCollege =
  (search = "") =>
  async (dispatch) => {
    dispatch(setLoading({ payload: true, type: "get" }));
    dispatch(setError({ payload: false, type: "get" }));
    try {
      let data;
      if (navigator.onLine) {
        const clear = await db.colleges.clear();
        console.log("searc", clear);

        ({ data } = await axios.get(`admin/college?search=${search}`, {
          headers: { Authorization: getStorage() },
        }));

        await db.colleges.bulkAdd(data);

        console.log("collge", data);
      } else {
        data = await db.colleges.toArray();
      }

      dispatch(setData(data));
      dispatch(setLoading({ payload: false, type: "get" }));
    } catch (error) {
      dispatch(setLoading({ payload: false, type: "get" }));
      dispatch(setError({ payload: true, type: "get" }));
    }
  };

export const getDepartmentOfCollege = (id) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "department" }));
  try {
    let data;
    if (navigator.onLine) {
      ({ data } = await axios.get(`/admin/colleges/${id}/departments`, {
        headers: { Authorization: getStorage() },
      }));
    } else {
      data = await db.departments.where("collegeId").equals(id).toArray();
    }
    dispatch(setDepartmentData(data));
    dispatch(setLoading({ payload: false, type: "department" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "department" }));
  }
};

export const addCollege = (form) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "post" }));
  dispatch(setError({ payload: false, type: "post" }));
  try {
    const { data } = await axios.post("admin/college", form, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getCollege());
    dispatch(setLoading({ payload: false, type: "post" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "post" }));
    dispatch(setError({ payload: error.response.data, type: "post" }));
    return false;
  }
};

export const deleteCollege = (id) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "delete" }));
  dispatch(setError({ payload: false, type: "delete" }));
  try {
    const { data } = await axios.delete(`admin/college/${id}`, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getCollege());
    dispatch(setLoading({ payload: false, type: "delete" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "delete" }));
    dispatch(setError({ payload: true, type: "delete" }));
    return false;
  }
};

export const updateCollege = (id, form) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "put" }));
  dispatch(setError({ payload: false, type: "put" }));
  try {
    const { data } = await axios.put(`admin/college/${id}`, form, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getCollege());
    dispatch(setLoading({ payload: false, type: "put" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "put" }));
    dispatch(setError({ payload: error.response.data, type: "put" }));
    return false;
  }
};
