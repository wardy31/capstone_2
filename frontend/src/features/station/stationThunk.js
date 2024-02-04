import axios from "../../utils/axios";
import { SET_DATA, SET_ERROR, SET_LOADING, SET_SUCCESS } from "./stationSlice";

export const getStation = () => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "getStation", payload: true }));
    dispatch(SET_ERROR({ type: "getStation", payload: false }));
    dispatch(SET_SUCCESS({ type: "getStation", payload: false }));

    const { data } = await axios.get("stations");
    console.log(data);

    dispatch(SET_LOADING({ type: "getStation", payload: false }));
    dispatch(SET_SUCCESS({ type: "getStation", payload: true }));
    dispatch(SET_DATA({ type: "getStation", payload: data }));
  } catch (error) {
    dispatch(SET_LOADING({ type: "getStation", payload: false }));
    dispatch(SET_ERROR({ type: "getStation", payload: true }));
  }
};

export const createStation = (forms) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "create", payload: true }));
    dispatch(SET_ERROR({ type: "create", payload: false }));
    dispatch(SET_SUCCESS({ type: "create", payload: false }));

    await axios.post("stations", forms);

    dispatch(SET_LOADING({ type: "create", payload: false }));
    dispatch(SET_SUCCESS({ type: "create", payload: true }));

    await dispatch(getStation());

    return true;
  } catch (error) {
    dispatch(SET_LOADING({ type: "create", payload: false }));
    dispatch(
      SET_ERROR({ type: "create", payload: error.response.data.details })
    );

    return false;
  }
};

export const updateStation = (forms) => async (dispatch) => {
  console.log(forms);
  try {
    dispatch(SET_LOADING({ type: "update", payload: true }));
    dispatch(SET_ERROR({ type: "update", payload: false }));
    dispatch(SET_SUCCESS({ type: "update", payload: false }));

    await axios.put(`stations/${forms.id}`, forms);

    dispatch(SET_LOADING({ type: "update", payload: false }));
    dispatch(SET_SUCCESS({ type: "update", payload: true }));

    await dispatch(getStation());

    return true;
  } catch (error) {
    dispatch(SET_LOADING({ type: "update", payload: false }));
    dispatch(
      SET_ERROR({ type: "update", payload: error.response.data.details })
    );

    return false;
  }
};

export const deleteStation = (id) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "delete", payload: true }));
    dispatch(SET_ERROR({ type: "delete", payload: false }));
    dispatch(SET_SUCCESS({ type: "delete", payload: false }));

    await axios.delete(`stations/${id}`);

    dispatch(SET_LOADING({ type: "delete", payload: false }));
    dispatch(SET_SUCCESS({ type: "delete", payload: true }));

    await dispatch(getStation());
    return true;
  } catch (error) {
    dispatch(SET_LOADING({ type: "delete", payload: false }));
    dispatch(SET_ERROR({ type: "delete", payload: true }));
    return false;
  }
};

export const getStationLogsById = (id) => async (dispatch) => {
  try {
    dispatch(SET_LOADING({ type: "getLogs", payload: true }));
    dispatch(SET_ERROR({ type: "getLogs", payload: false }));
    dispatch(SET_SUCCESS({ type: "getLogs", payload: false }));

    const { data } = await axios.get(`stations/${id}/location-histories`);

    dispatch(SET_DATA({ type: "getLogs", payload: data }));
    dispatch(SET_LOADING({ type: "getLogs", payload: false }));
    dispatch(SET_SUCCESS({ type: "getLogs", payload: true }));
  } catch (error) {
    dispatch(SET_LOADING({ type: "getLogs", payload: false }));
    dispatch(SET_ERROR({ type: "getLogs", payload: true }));
  }
};
