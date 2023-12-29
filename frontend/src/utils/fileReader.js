const reader = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      const fileData = event.target.result;
      resolve(fileData);
    };

    fileReader.onerror = (event) => {
      reject(event.target.error);
    };

    fileReader.readAsDataURL(file);
  });
};

export default reader;
