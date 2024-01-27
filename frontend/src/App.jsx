import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "./hooks/useFetch";
import store from "./store/store";
import { getAuth } from "./features/auth/authThunks";

function App() {
  const { loading } = useSelector((state) => state.auth.getUser);
  useFetch(() => store.dispatch(getAuth()));

  if (loading) {
    return;
  }
  
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
