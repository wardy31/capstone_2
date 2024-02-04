import { useSelector } from "react-redux";

function useAuth() {
  const { data } = useSelector((state) => state.auth.getUser);

  console.log("data",data);
  return Object.keys(data).length ? true : false;
}

export default useAuth;
