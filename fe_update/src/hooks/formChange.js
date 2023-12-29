import { useState } from "react";

const formChange = (initialState) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (data, type) => setForm({ ...form, [type]: data });

  return [form, handleChange];
};

export default formChange;
