import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getModel, postDetectFace } from "../../models/modelThunks";

function useFace(initialState) {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);

  const handleFaceDetection = async (image) => {
    const result = await dispatch(postDetectFace(image));
    setState(result);
  };

  return {
    faceResult: state,
    handleFaceDetection,
  };
}

export default useFace;
