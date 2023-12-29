const validate = (key, data) => {
  if (Array.isArray(data)) {
    const result = data.find((f) => f.context.key == key);
    return result ? result.message : "";
  }

  return false;
};

export default validate;
