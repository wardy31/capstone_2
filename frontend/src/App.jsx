import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "./hooks/useFetch";
import store from "./store/store";
import { getAuth } from "./features/auth/authThunks";
import { socket } from "./utils/socket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyClinic } from "./features/user/userThunks";

function App() {
  const { loading } = useSelector((state) => state.auth.getUser);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected to server", socket.id);
    });

    socket.on("clinic", (arg) => {
      console.log(arg);
      store.dispatch(notifyClinic(true));
    });
  }, []);

  useFetch(() => store.dispatch(getAuth()));

  if (loading) {
    return <></>;
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <Outlet />
    </>
  );
}

export default App;
