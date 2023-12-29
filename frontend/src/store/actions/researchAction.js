import { db } from "../../../db/db";
import axios from "../../utils/axios";
import { getStorage } from "../../utils/storage";
import { setData, setLoading, setError } from "../reducers/researchReducer";
import FileReader from "../../utils/fileReader";

export const getSearchResearch = (form) => async (dispatch) => {
  dispatch(setError({ payload: false, type: "approve" }));
  try {
    const { data } = await axios.get(
      `researches?status=${"approve"}&search=${form}`,
      {
        headers: { Authorization: getStorage() },
      }
    );

    console.log("research", data);
    dispatch(setData({ payload: data, type: "approve" }));
    dispatch(setLoading({ payload: false, type: "approve" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "approve" }));
    dispatch(setError({ payload: true, type: "approve" }));
  }
};

export const searchResearchByAuthor =
  (form = "") =>
  async (dispatch) => {
    dispatch(setError({ payload: false, type: "get" }));
    try {
      const { data } = await axios.get(`/researches/authors?search=${form}`, {
        headers: { Authorization: getStorage() },
      });

      dispatch(setData({ payload: data, type: "get" }));
      dispatch(setLoading({ payload: false, type: "get" }));
    } catch (error) {
      dispatch(setLoading({ payload: false, type: "get" }));
      dispatch(setError({ payload: true, type: "get" }));
    }
  };

export const getResearch =
  (form = { search: "", status: "all", year: "", month: "" }) =>
  async (dispatch) => {
    dispatch(setLoading({ payload: true, type: "user" }));
    dispatch(setError({ payload: false, type: "user" }));
    try {
      let data;
      if (navigator.onLine) {
        if (form.status != "sync_pending") {
          ({ data } = await axios.get(
            `/researches/authors?search=${form.search}&month=${form.month}&year=${form.year}&status=${form.status}& `,
            {
              headers: { Authorization: getStorage() },
            }
          ));
        } else {
          data = await db.sync_researches.toArray();
        }
      } else {
        data = await db.sync_researches.toArray();
      }

      dispatch(getSyncPending());
      dispatch(setData({ payload: data, type: "user" }));
      dispatch(setLoading({ payload: false, type: "user" }));
    } catch (error) {
      dispatch(setLoading({ payload: false, type: "user" }));
      dispatch(setError({ payload: true, type: "user" }));
    }
  };

export const getResearchById = (id) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "view" }));
  dispatch(setError({ payload: false, type: "view" }));
  try {
    let data;
    if (navigator.onLine) {
      ({ data } = await axios.get(`/researches/authors/${id}`, {
        headers: { Authorization: getStorage() },
      }));
    } else {
      data = await db.researches.where("researchId").equals(Number(id)).first();
      console.log("data offline", data);
    }

    dispatch(setData({ payload: data, type: "view" }));
    dispatch(setLoading({ payload: false, type: "view" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "view" }));
    dispatch(setError({ payload: true, type: "view" }));
  }
};

export const getApprovedResearch =
  (form = false) =>
  async (dispatch) => {
    dispatch(setLoading({ payload: true, type: "approve" }));
    dispatch(setError({ payload: false, type: "approve" }));
    try {
      const { data } = await axios.get(`researches?status=${"published"}`, {
        headers: { Authorization: getStorage() },
      });

      console.log("research", data);
      dispatch(setData({ payload: data, type: "approve" }));
      dispatch(setLoading({ payload: false, type: "approve" }));
    } catch (error) {
      dispatch(setLoading({ payload: false, type: "approve" }));
      dispatch(setError({ payload: true, type: "approve" }));
    }
  };

export const addResearch = (form) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "post" }));
  dispatch(setError({ payload: false, type: "post" }));

  try {
    if (navigator.onLine) {
      const { data } = await axios.post("researches", form, {
        headers: {
          Authorization: getStorage(),
        },
      });
    } else {
      const formData = async () => {
        const formObj = { status: "sync_pending" };
        for (const [key, value] of form) {
          if (key == "file") {
            if (typeof value == "object")
              formObj[key] = await FileReader(value);
          } else {
            formObj[key] = value;
          }
        }

        return await formObj;
      };

      await db.sync_researches.add(await formData());
    }

    dispatch(getResearch());
    dispatch(getApprovedResearch());
    dispatch(setLoading({ payload: false, type: "post" }));

    return true;
  } catch (error) {
    console.log(error);
    dispatch(setLoading({ payload: false, type: "post" }));
    dispatch(setError({ payload: error.response.data, type: "post" }));
    return false;
  }
};

export const deleteResearch = (id) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "delete" }));
  dispatch(setError({ payload: false, type: "delete" }));
  try {
    if (navigator.onLine) {
      const { data } = await axios.delete(`researches/${id}`, {
        headers: {
          Authorization: getStorage(),
        },
      });
    } else {
      await db.sync_researches.delete(id);
    }
    console.log(id);
    dispatch(getResearch());
    dispatch(getPendingResearch());
    dispatch(getRequestDeleteResearch());
    dispatch(getApprovedResearch());
    dispatch(setLoading({ payload: false, type: "delete" }));

    return true;
  } catch (error) {
    console.log(error);
    dispatch(setLoading({ payload: false, type: "delete" }));
    dispatch(setError({ payload: true, type: "delete" }));
    return false;
  }
};

export const updateResearch = (id, form) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "put" }));
  dispatch(setError({ payload: false, type: "put" }));
  try {
    if (navigator.onLine) {
      await axios.put(`researches/${id}`, form, {
        headers: {
          Authorization: getStorage(),
        },
      });
    } else {
      const formData = async () => {
        const formObj = { status: "sync_pending" };
        for (const [key, value] of form) {
          if (key == "file") {
            if (typeof value == "string") {
              formObj[key] = value;
            } else {
              formObj[key] = await FileReader(value);
            }
          } else {
            formObj[key] = value;
          }
        }

        return await formObj;
      };
      await db.sync_researches.update(id, await formData());
    }

    dispatch(getResearch());
    dispatch(getApprovedResearch());
    dispatch(setLoading({ payload: false, type: "put" }));

    return true;
  } catch (error) {
    console.log(error);
    dispatch(setLoading({ payload: false, type: "put" }));
    // dispatch(setError({ payload: error.response.data, type: "put" }));
    return false;
  }
};

export const changeResearchStatus =
  (id, status, query = null) =>
  async (dispatch) => {
    dispatch(setLoading({ payload: true, type: "status" }));
    dispatch(setError({ payload: false, type: "status" }));
    try {
      await axios.put(
        `/researches/${id}/status?status=${status}`,
        {},
        {
          headers: {
            Authorization: getStorage(),
          },
        }
      );
      dispatch(getResearch());
      dispatch(getResearches(query));
      // dispatch(getPendingResearch());
      // dispatch(getRequestDeleteResearch());
      dispatch(setLoading({ payload: false, type: "status" }));
      return true;
    } catch (error) {
      dispatch(setLoading({ payload: false, type: "status" }));
      dispatch(setError({ payload: true, type: "status" }));
      return false;
    }
  };

export const getPendingResearch = () => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "pending" }));
  dispatch(setError({ payload: false, type: "pending" }));
  try {
    const { data } = await axios.get(`researches?status=${"published"}`, {
      headers: { Authorization: getStorage() },
    });

    console.log("pending", data);
    dispatch(setData({ payload: data, type: "pending" }));
    dispatch(setLoading({ payload: false, type: "pending" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "pending" }));
    dispatch(setError({ payload: true, type: "pending" }));
  }
};

export const getRequestDeleteResearch = () => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "request_delete" }));
  dispatch(setError({ payload: false, type: "request_delete" }));
  try {
    const { data } = await axios.get(`researches?status=${"request_delete"}`, {
      headers: { Authorization: getStorage() },
    });

    console.log("request-delete", data);
    dispatch(setData({ payload: data, type: "request_delete" }));
    dispatch(setLoading({ payload: false, type: "request_delete" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "request_delete" }));
    dispatch(setError({ payload: true, type: "request_delete" }));
  }
};

export const getResearchLogs = (researchId) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "logs" }));
  dispatch(setError({ payload: false, type: "logs" }));
  try {
    const { data } = await axios.get(`/researches/${researchId}/logs`, {
      headers: { Authorization: getStorage() },
    });

    console.log("logs", data);
    dispatch(setData({ payload: data, type: "logs" }));
    dispatch(setLoading({ payload: false, type: "logs" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "logs" }));
    dispatch(setError({ payload: true, type: "logs" }));
  }
};

export const getResearches = (query, status) => async (dispatch) => {
  dispatch(
    setLoading({ payload: true, type: status == "approve" ? "approve" : "get" })
  );
  dispatch(
    setError({ payload: false, type: status == "approve" ? "approve" : "get" })
  );

  console.log("query",query);
  try {
    const { data } = await axios.get(
      `/researches?status=${query.status}&search=${query.search}&year=${query.year}&month=${query.month}`,
      {
        headers: { Authorization: getStorage() },
      }
    );

    dispatch(
      setData({ payload: data, type: status == "approve" ? "approve" : "get" })
    );
    dispatch(
      setLoading({
        payload: false,
        type: status == "approve" ? "approve" : "get",
      })
    );
  } catch (error) {
    dispatch(
      setLoading({
        payload: false,
        type: status == "approve" ? "approve" : "get",
      })
    );
    dispatch(
      setError({ payload: true, type: status == "approve" ? "approve" : "get" })
    );
  }
};

export const bulkUpload = (form) => async (dispatch) => {
  try {
    const data = await db.sync_researches.toArray();
    if (data.length) {
      for (const iterator of data) {
        const convert = await fetch(iterator.file);
        const result = await convert.blob();
        const file = new File([result], "file.pdf", {
          type: "application/pdf",
        });

        const formData = new FormData();
        formData.append("title", iterator.title);
        formData.append("abstract", iterator.abstract);
        formData.append("paperType", iterator.paperType);
        formData.append("month", iterator.month);
        formData.append("year", iterator.year);
        formData.append("authors", JSON.stringify([]));
        formData.append("file", file);

        await axios.post("researches", formData, {
          headers: {
            Authorization: getStorage(),
          },
        });
      }

      await db.sync_researches.clear();
      dispatch(getSyncPending());
      dispatch(getResearch());
    }

    console.log(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getSyncPending = () => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "sync_pending" }));
  dispatch(setError({ payload: false, type: "sync_pending" }));
  try {
    const data = await db.sync_researches.toArray();

    console.log("sync_pendings", data);
    dispatch(setData({ payload: data, type: "sync_pending" }));
    dispatch(setLoading({ payload: false, type: "sync_pending" }));
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "sync_pending" }));
    dispatch(setError({ payload: true, type: "sync_pending" }));
  }
};

export const updateResearchStatus = (id, status) => async (dispatch) => {
  dispatch(setLoading({ payload: true, type: "delete_request" }));
  // dispatch(setError({ payload: false, type: "delete_request" }));
  try {
    const { data } = await axios.put(
      `/researches/${id}/delete-status`,
      {
        status: status,
      },
      {
        headers: { Authorization: getStorage() },
      }
    );

    console.log("delete_requests", data);
    dispatch(setLoading({ payload: false, type: "delete_request" }));
    return true;
  } catch (error) {
    dispatch(setLoading({ payload: false, type: "delete_request" }));
    // dispatch(setError({ payload: true, type: "sync_pending" }));
    return false;
  }
};
