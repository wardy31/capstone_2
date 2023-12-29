import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import store from "./store/store";
import { getCollege } from "./store/actions/collegeAction";
import { getDepartment } from "./store/actions/departmentAction";
import { getCourse } from "./store/actions/courseAction";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    store.dispatch(getCollege())    
    store.dispatch(getDepartment())
    store.dispatch(getCourse())
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
