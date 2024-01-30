import { Outlet, createBrowserRouter, useNavigate } from "react-router-dom";
import App from "../App";
import LoginUser from "../features/auth/LoginUser";
import CreateAccount from "../features/user/CreateAccount";
import PageNotFound from "../layouts/not_found/PageNotFound";
import Station from "../features/station/Station";
import ClinicLayout from "../layouts/ClinicLayout";
import StationLogs from "../features/station/StationLogs";
import FormRecord from "../features/health_form/containers/FormRecord";
import ManageForm from "../features/health_form/containers/ManageForm";
import User from "../features/user/containers/manage_user/User";
import UserProfile from "../features/user/containers/manage_user/UserProfile";
import TraceContacts from "../features/contacts/containers/TraceContacts";
import MonitorContacts from "../features/contacts/containers/MonitorContacts";
import CloseContact from "../features/contacts/containers/CloseContact";
import UserLayout from "../layouts/UserLayout";
import UserHome from "../features/user/containers/UserHome";
import UserRecord from "../features/user/containers/UserRecord";
import Form from "../features/health_form/containers/Form";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "clinic",
        element: <ClinicLayout />,
        children: [
          {
            path: "stations",
            element: <Station />,
          },
          {
            path: "stations/:id/logs",
            element: <StationLogs></StationLogs>,
          },
          {
            path: "users",
            element: <User></User>,
          },
          {
            path: "profile/:id",
            element: <UserProfile></UserProfile>,
          },
          {
            path: "health-records",
            element: <FormRecord></FormRecord>,
          },
          {
            path: "manage-form",
            element: <ManageForm></ManageForm>,
          },
          {
            path: "monitor-contacts",
            element: <MonitorContacts></MonitorContacts>,
          },
          {
            path: "monitor-contacts/:id/trace-contacts",
            element: <CloseContact></CloseContact>,
          },
        ],
      },
      {
        path: "user",
        element: <UserLayout></UserLayout>,
        children: [
          {
            path: "home",
            element: <UserHome></UserHome>,
          },
          {
            path: "form",
            element: <Form></Form>,
          },
          {
            path: "visited-logs",
            element: <UserRecord></UserRecord>,
          },
        ],
      },
      {
        path: "login",
        element: <LoginUser />,
      },
      {
        path: "create-account",
        element: <CreateAccount />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
