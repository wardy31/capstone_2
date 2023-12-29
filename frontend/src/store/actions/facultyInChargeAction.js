import axios from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import {
  setData,
  setLoading,
  setError,
} from "../reducers/facultyInChargeReducer";

export const searchFaculty = (form, validate) => async (dispatch) => {
  dispatch(setError({ payload: false, type: "get" }));
  try {
    const { data } = await axios.get(
      `admin/faculty-in-charge?validate=${validate}&search=${form}`,
      {
        headers: { Authorization: getStorage() },
      }
    );

    dispatch(setData({ payload: data, type: "get" }));
    dispatch(setLoading({ payload: false, type: "get" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "get" }));
    dispatch(setError({ payload: true, type: "get" }));
  }
};

export const getDashboard =
  (form = { isValidate: "all", search: "" }) =>
  async (dispatch) => {
    dispatch(setLoading({ payload: true, type: "dashboard" }));
    dispatch(setError({ payload: false, type: "dashboard" }));
    try {
      const { data } = await axios.get(
        `users?isValidate=${form.isValidate}&role=faculty_in_charge`,
        {
          headers: { Authorization: getStorage() },
        }
      );

      dispatch(setData({ payload: data, type: "dashboard" }));
      dispatch(setLoading({ payload: false, type: "dashboard" }));
    } catch (error) {
      dispatch(setLoading({ payload: false, type: "dashboard" }));
      dispatch(setError({ payload: true, type: "dashboard" }));
    }
  };

export const getFaculty =
  (form = { search: "", isValidate: "all" }) =>
  async (dispatch) => {
    dispatch(setLoading({ payload: true, type: "get" }));
    dispatch(setError({ payload: false, type: "get" }));
    try {
      const { data } = await axios.get(
        `users?isValidate=${form.isValidate}&role=faculty_in_charge&search=${form.search}`,
        {
          headers: { Authorization: getStorage() },
        }
      );

      console.log(data);
      dispatch(setData({ payload: data, type: "get" }));
      dispatch(setLoading({ payload: false, type: "get" }));
    } catch (error) {
      dispatch(setLoading({ payload: false, type: "get" }));
      dispatch(setError({ payload: true, type: "get" }));
    }
  };

export const addFaculty = (form, validate) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "post" }));
  dispatch(setError({ payload: false, type: "post" }));
  try {
    const { data } = await axios.post("admin/faculty-in-charge", form, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getFaculty(validate));
    dispatch(setLoading({ payload: false, type: "post" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "post" }));
    dispatch(setError({ payload: true, type: "post" }));
    return false;
  }
};

export const deleteFaculty = (id, validate) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "delete" }));
  dispatch(setError({ payload: false, type: "delete" }));
  try {
    const { data } = await axios.delete(`admin/faculty-in-charge/${id}`, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getFaculty(validate));
    dispatch(setLoading({ payload: false, type: "delete" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "delete" }));
    dispatch(setError({ payload: true, type: "delete" }));
    return false;
  }
};

export const updateFaculty = (id, form, validate) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "put" }));
  dispatch(setError({ payload: false, type: "put" }));
  try {
    const { data } = await axios.put(`admin/faculty-in-charge/${id}`, form, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getFaculty(validate));
    dispatch(setLoading({ payload: false, type: "put" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "put" }));
    dispatch(setError({ payload: true, type: "put" }));
    return false;
  }
};

export const validateFaculty = (id, form, validate) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "validate" }));
  dispatch(setError({ payload: false, type: "validate" }));
  try {
    const { data } = await axios.put(
      `admin/faculty-in-charge/${id}?validate=${form}`,
      {},
      {
        headers: {
          Authorization: getStorage(),
        },
      }
    );
    dispatch(getFaculty(validate));
    dispatch(setLoading({ payload: false, type: "validate" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "validate" }));
    dispatch(setError({ payload: true, type: "validate" }));
    return false;
  }
};

export const changeRole = (id, validate) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `/admin/faculty-in-charge/${id}/role`,
      {},
      {
        headers: {
          Authorization: getStorage(),
        },
      }
    );

    dispatch(getFaculty());
    dispatch(setLoading({ payload: false, type: "validate" }));
    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "validate" }));
    dispatch(setError({ payload: true, type: "validate" }));
    return false;
  }
};
