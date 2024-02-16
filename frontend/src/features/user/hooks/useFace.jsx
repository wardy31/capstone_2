import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getModel, postDetectFace } from "../../models/modelThunks";

function useFace(initialState) {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleFaceDetection = async (image) => {
    setError(false);
    setLoading(true);
    const result = await dispatch(postDetectFace(image));
    setLoading(false);

    switch (result.status) {
      case 2:
        setError("No face detected");
        break;
      case 3:
        setError("Detected the same face on the system");
        break;

      default:
        break;
    }
    return result;
  };

  const handleError = (isError) => setError(isError);

  return {
    error: error,
    loading: loading,
    faceResult: state,
    handleFaceDetection,
    handleError: handleError,
  };
}

export default useFace;
