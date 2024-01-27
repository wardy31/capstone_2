import { useState } from "react";

function useDialog(initialState) {
  const [dialog, setDialog] = useState(initialState);

  const handleDialog = (data, property) =>
    setDialog({ ...dialog, [property]: data });

  return { dialog, handleDialog };
}

export default useDialog;
