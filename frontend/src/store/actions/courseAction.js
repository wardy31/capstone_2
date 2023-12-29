import { db } from "../../../db/db";
import axios from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { setData, setError, setLoading } from "../reducers/courseReducer";

export const getCourse = () => async (dispatch) => {
  setLoading({ payload: true, type: "get" });
  try {
    let data;
    if (navigator.onLine) {
      await db.courses.clear();
      ({ data } = await axios.get("courses"));
      console.log("courses", data);

      await db.courses.bulkAdd(data);
    } else {
      data = await db.courses.toArray();
    }
    setData({ payload: data, type: "get" });
    setLoading({ payload: true, type: "get" });
  } catch (error) {
    setLoading({ payload: true, type: "get" });
  }
};

export const getUserbyCourse = () => async (dispatch, getState) => {
  const {
    user: {
      auth: {
        data: { courseId },
      },
    },
  } = getState();

  dispatch(setLoading({ payload: true, type: "get" }));
  try {
    const { data } = await axios.get(`courses/${courseId}/users`, {
      headers: {
        Authorization: getStorage(),
      },
    });
    console.log("courses", data);
    dispatch(setData({ payload: data, type: "get" }));
    dispatch(setLoading({ payload: false, type: "get" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "get" }));
  }
};

export const getCoursesByDepartmentId = (departmentId) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "department" }));

  try {
    let data;
    if (navigator.onLine) {
      ({ data } = await axios.get(`/departments/${departmentId}/courses`, {
        headers: {
          Authorization: getStorage(),
        },
      }));
    } else {
      data = await db.courses
        .where("departmentId")
        .equals(departmentId)
        .toArray();
    }
    dispatch(setData({ payload: data, type: "department" }));
    dispatch(setLoading({ payload: false, type: "department" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "department" }));
  }
};

export const addCourse = (form, departmentId) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "post" }));

  try {
    const { data } = await axios.post(`courses`, form, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(setLoading({ payload: false, type: "post" }));
    dispatch(getCoursesByDepartmentId(departmentId));

    return true;
  } catch (error) {
    console.log(error.response.data);
    dispatch(setLoading({ payload: false, type: "post" }));
    dispatch(setError({ payload: error.response.data.details, type: "post" }));

    return false;
  }
};

export const deleteCourseById = (id, departmentId) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "delete" }));

  try {
    const { data } = await axios.delete(`courses/${id}`, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(setLoading({ payload: false, type: "delete" }));
    dispatch(getCoursesByDepartmentId(departmentId));

    return true;
  } catch (error) {
    console.log(error.response.data.details);
    dispatch(setLoading({ payload: false, type: "delete" }));
    // dispatch(setError({ payload: error, type: "post" }));

    return false;
  }
};

export const updateCourseById = (id, form) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "update" }));

  try {
    const { data } = await axios.put(`courses/${id}`, form, {
      headers: {
        Authorization: getStorage(),
      },
    });

    dispatch(setLoading({ payload: false, type: "update" }));
    dispatch(getCoursesByDepartmentId(form.departmentId));

    return true;
  } catch (error) {
    console.log(error.response.data);
    dispatch(setLoading({ payload: false, type: "update" }));
    dispatch(setError({ payload: error, type: "update" }));

    return false;
  }
};
