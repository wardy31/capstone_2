import axios from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { setData, setLoading, setError } from "../reducers/studentReducer";

export const searchStudent = (form, validate) => async (dispatch) => {
  // dispatch(setLoading({ payload: true, type: "get" }));
  dispatch(setError({ payload: false, type: "get" }));
  try {
    const { data } = await axios.get(
      `admin/students?search=${form}&validate=${validate}`,
      {
        headers: { Authorization: getStorage() },
      }
    );
    dispatch(setData({ payload: data, type: "get" }));

    return true;
    // dispatch(setLoading({ payload: false, type: "get" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "get" }));
    dispatch(setError({ payload: true, type: "get" }));
  }
};

export const getStudent =
  (form = { isValidate: "all", search: "" }) =>
  async (dispatch) => {
    dispatch(setLoading({ payload: true, type: "get" }));
    dispatch(setError({ payload: false, type: "get" }));
    try {
      const { data } = await axios.get(
        `users?isValidate=${form.isValidate}&role=student&search=${form.search}`,
        {
          headers: { Authorization: getStorage() },
        }
      );

      console.log("student", data);
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
        `users?isValidate=${form.isValidate}&role=student`,
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

export const addStudent = (form, validate) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "post" }));
  dispatch(setError({ payload: false, type: "post" }));
  try {
    const { data } = await axios.post("admin/students", form, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getStudent(validate));
    dispatch(setLoading({ payload: false, type: "post" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "post" }));
    dispatch(setError({ payload: true, type: "post" }));
    return false;
  }
};

export const deleteStudent = (id, validate) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "delete" }));
  dispatch(setError({ payload: false, type: "delete" }));
  try {
    const { data } = await axios.delete(`admin/students/${id}`, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getStudent(validate));
    dispatch(getStudentNotValidate());
    dispatch(setLoading({ payload: false, type: "delete" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "delete" }));
    dispatch(setError({ payload: true, type: "delete" }));
    return false;
  }
};

export const updateStudent = (id, form, validate) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "put" }));
  dispatch(setError({ payload: false, type: "put" }));
  try {
    const { data } = await axios.put(`admin/students/${id}`, form, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getStudent(validate));
    dispatch(setLoading({ payload: false, type: "put" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "put" }));
    dispatch(setError({ payload: true, type: "put" }));
    return false;
  }
};

export const validateStudent = (id, form, query) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "validate" }));
  dispatch(setError({ payload: false, type: "validate" }));
  try {
    const { data } = await axios.put(
      `admin/students/${id}?validate=${form}`,
      {},
      {
        headers: {
          Authorization: getStorage(),
        },
      }
    );
    dispatch(getStudent(query));
    dispatch(setLoading({ payload: false, type: "validate" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "validate" }));
    dispatch(setError({ payload: true, type: "validate" }));
    return false;
  }
};

export const getStudentNotValidate = () => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "notValidated" }));
  dispatch(setError({ payload: false, type: "notValidated" }));
  try {
    const { data } = await axios.get(`admin/students?validate=${false}`, {
      headers: { Authorization: getStorage() },
    });

    console.log("hehe");
    dispatch(setData({ payload: data, type: "notValidated" }));
    dispatch(setLoading({ payload: false, type: "notValidated" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "notValidated" }));
    dispatch(setError({ payload: true, type: "notValidated" }));
  }
};

export const validateRequestStudent = (id, form) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "notValidated" }));
  dispatch(setError({ payload: false, type: "notValidated" }));
  try {
    const { data } = await axios.put(
      `admin/students/${id}?validate=${form}`,
      {},
      {
        headers: {
          Authorization: getStorage(),
        },
      }
    );
    dispatch(getStudentNotValidate());
    dispatch(setLoading({ payload: false, type: "notValidated" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "notValidated" }));
    dispatch(setError({ payload: true, type: "notValidated" }));
    return false;
  }
};
