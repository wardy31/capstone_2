import { toast, Bounce } from "react-toastify";

const notify = (message, mode = "success") =>
  toast[mode](message, {
    position: "bottom-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

export default notify;
