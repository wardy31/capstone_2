import React, { useState } from "react";

function useData(initialState) {
  const [state, setState] = useState(initialState);

  const handleChange = (data) => setState(data);

  return { state, handleChange };
}

export default useData;
