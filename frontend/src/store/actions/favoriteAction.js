import axios from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { setData, setLoading, setError } from "../reducers/favoriteReducer";
import { getApprovedResearch } from "./researchAction";
import { db } from "../../../db/db";
import FileReader from "../../utils/fileReader";

export const researchFavorite = (form) => async (dispatch) => {
  dispatch(setError({ payload: false, type: "get" }));
  try {
    const { data } = await axios.get(`saved-researches?search=${form}`, {
      headers: { Authorization: getStorage() },
    });

    dispatch(setData(data));
    dispatch(setLoading({ payload: false, type: "get" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "get" }));
    dispatch(setError({ payload: true, type: "get" }));
  }
};

export const getFavorite = (form) => async (dispatch, getState) => {
  dispatch(setLoading({ payload: true, type: "get" }));
  dispatch(setError({ payload: false, type: "get" }));
  const state = getState();
  console.log("isOffline", navigator.onLine);
  try {
    let data;
    if (navigator.onLine) {
      ({ data } = await axios.get(`saved-researches`, {
        headers: { Authorization: getStorage() },
      }));

      await db.researches.clear();

      if (data.length) {
        const arrPush = async () => {
          const arr = [];

          for (const element of data) {
            const { id, researchId, userId, createdAt, research } = element;

            const res = await fetch(
              `${import.meta.env.VITE_BE_COVER_HOST}${research.filename}`
            ).then((res) => res.blob());

            // const image = await fetch(
            //   `${import.meta.env.VITE_BE_COVER_HOST}cover/${
            //     research.id
            //   }/cover.png`
            // ).then((res) => res.blob());

            const fileData = await FileReader(res);
            // const imageFile = await FileReader(image);

            arr.push({
              id,
              researchId,
              userId,
              createdAt,
              research: JSON.stringify(research),
              file: fileData,
              // image: imageFile,
            });
          }

          return arr;
        };

        await db.researches.bulkAdd(await arrPush());
        console.log("result", await arrPush());
      }
      console.log("online");
    } else {
      data = await db.researches.toArray();
      console.log("offline");
    }
    dispatch(setData(data));
    dispatch(setLoading({ payload: false, type: "get" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "get" }));
    dispatch(setError({ payload: true, type: "get" }));
  }
};

export const addFavorite = (id) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "post" }));
  dispatch(setError({ payload: false, type: "post" }));

  try {
    const { data } = await axios.post(
      `saved-researches/${id}`,
      {},
      {
        headers: {
          Authorization: getStorage(),
        },
      }
    );

    dispatch(getApprovedResearch());
    dispatch(getFavorite());
    dispatch(setLoading({ payload: false, type: "post" }));

    return true;
  } catch (error) {
    console.log(error);
    dispatch(setLoading({ payload: false, type: "post" }));
    dispatch(setError({ payload: true, type: "post" }));
    return false;
  }
};

export const deleteFavorite = (id) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "delete" }));
  dispatch(setError({ payload: false, type: "delete" }));
  try {
    const { data } = await axios.delete(`saved-researches/${id}`, {
      headers: {
        Authorization: getStorage(),
      },
    });
    await dispatch(getFavorite());
    await dispatch(setLoading({ payload: false, type: "delete" }));

    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "delete" }));
    dispatch(setError({ payload: true, type: "delete" }));
    return false;
  }
};
