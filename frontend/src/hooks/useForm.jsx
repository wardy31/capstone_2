import React, { useState } from "react";

function useForm(initialState) {
  const [state, setState] = useState(initialState);

  const handleChange = (data, propertyName) => {
    setState({ ...state, [propertyName]: data });
  };

  const handleAll = (data) => setState({ ...data });

  return { state, handleChange, handleAll };
}

export default useForm;
