import React, { useState } from "react";

function useValue(initialState) {
  const [state, setState] = useState(initialState);

  const handleChange = () => setState(!state);
  
  return { state, handleChange };
}

export default useValue;
