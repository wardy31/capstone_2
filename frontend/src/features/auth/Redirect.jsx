import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { getAuth } from "./authThunks";
import { useSelector } from "react-redux";
import store from "../../store/store";
import useAuth from "../../hooks/useAuth";

function Redirect() {
  const { data, loading } = useSelector((state) => state.auth.getUser);
  const navigate = useNavigate();

  const isAuth = useAuth();
  useFetch(() => {
    console.log(isAuth);
    if (!isAuth) {
      navigate("/login");
      return;
    }

    if (!loading) {
      if (data?.role == "clinic") {
        navigate("/clinic/dashboard");
        return;
      } else {
        navigate("/user/home");
        return;
      }
    }
  });

  if (loading) {
    return <></>;
  }

  return <></>;
}

export default Redirect;
