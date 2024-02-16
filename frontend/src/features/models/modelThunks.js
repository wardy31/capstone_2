import axios from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "./modelSlice";

export const getModel = () => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "loadModel", payload: true }));
    dispatch(SET_SUCCESS({ type: "loadModel", payload: false }));
    dispatch(SET_ERROR({ type: "loadModel", payload: false }));

    const { data } = await axios.get("load-models", {
      headers: {
        Authorization: getStorage(),
      },
    });

    dispatch(SET_LOADING({ type: "loadModel", payload: false }));
    dispatch(SET_SUCCESS({ type: "loadModel", payload: true }));
    console.log(data);
  } catch (error) {
    dispatch(SET_ERROR({ type: "loadModel", payload: true }));
  }
};

export const postDetectFace = (image) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "detectFace", payload: true }));
    dispatch(SET_SUCCESS({ type: "detectFace", payload: false }));
    dispatch(SET_ERROR({ type: "detectFace", payload: false }));

    const { data } = await axios.post("scan-face", image, {
      headers: {
        Authorization: getStorage(),
      },
    });

    dispatch(SET_LOADING({ type: "detectFace", payload: false }));
    dispatch(SET_SUCCESS({ type: "detectFace", payload: true }));
    console.log("has face");

    return { status: 1, message: "face detected" };
  } catch (error) {
    console.log("no face", error);
    const status = error.response.data?.status;
    dispatch(SET_ERROR({ type: "detectFace", payload: true }));

    if (!status) {
      return { status: 2, message: "no face detected" };
    } else {
      return { status: 3, message: "faceSimilar" };
    }
  }
};
