import axios from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { setData, setLoading, setError } from "../reducers/feedbackReducer";

export const getFeedback = (id) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "get" }));
  dispatch(setError({ payload: false, type: "get" }));
  try {
    const { data } = await axios.get(`feedbacks/researches/${id}`, {
      headers: { Authorization: getStorage() },
    });

    dispatch(setData(data));
    dispatch(setLoading({ payload: false, type: "get" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "get" }));
    dispatch(setError({ payload: true, type: "get" }));
  }
};

export const addFeedback = (form, id) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "post" }));
  dispatch(setError({ payload: false, type: "post" }));
  try {
    const { data } = await axios.post(`feedbacks/researches/${id}`, form, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getFeedback(id));
    dispatch(setLoading({ payload: false, type: "post" }));

    return true;
  } catch (error) {
    console.log(error);
    dispatch(setLoading({ payload: false, type: "post" }));
    dispatch(setError({ payload: true, type: "post" }));
    return false;
  }
};

export const deleteFeedback = (id, researchId) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "delete" }));
  dispatch(setError({ payload: false, type: "delete" }));
  try {
    const { data } = await axios.delete(`feedbacks/${id}`, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getFeedback(researchId));
    dispatch(setLoading({ payload: false, type: "delete" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "delete" }));
    dispatch(setError({ payload: true, type: "delete" }));
    return false;
  }
};

export const updateFeedback = (id, form, validate) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "put" }));
  dispatch(setError({ payload: false, type: "put" }));
  try {
    const { data } = await axios.put(`admin/Feedbacks/${id}`, form, {
      headers: {
        Authorization: getStorage(),
      },
    });
    dispatch(getFeedback(validate));
    dispatch(setLoading({ payload: false, type: "put" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "put" }));
    dispatch(setError({ payload: true, type: "put" }));
    return false;
  }
};
