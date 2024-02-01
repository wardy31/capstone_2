import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getModel, postDetectFace } from "../../models/modelThunks";

function useFace(initialState) {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleFaceDetection = async (image) => {
    setLoading(true);
    const result = await dispatch(postDetectFace(image));
    setLoading(false);
    setState(result);
  };

  return {
    loading: loading,
    faceResult: state,
    handleFaceDetection,
  };
}

export default useFace;
