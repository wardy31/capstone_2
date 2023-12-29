import { createBrowserRouter } from "react-router-dom";
import Login from "../views/public/Login";
import CreateAccount from "../views/public/CreateAccount";
import Admin from "../views/admin/Admin";
import App from "../App";
import AdminDashboard from "../views/admin/dashboard/AdminDashboard";
import AdminCollege from "../views/admin/college/AdminCollege";
import AdminDepartment from "../views/admin/department/AdminDepartment";
import AdminStudent from "../views/admin/students/AdminStudent";
import AdminFaculty from "../views/admin/faculty/AdminFaculty";
import AdminFacultyInCharge from "../views/admin/faculty_in_charge/AdminFacultyInCharge";

import Faculty from "../views/faculty/Faculty";
import FacultyProfile from "../views/faculty/profile/Index";
import Index from "../views/faculty/home/Index";
import ViewResearch from "../views/faculty/home/ViewResearch";
import ResearchIndex from "../views/faculty/my_research/Index";
import SavedIndex from "../views/faculty/saved_research/Index";
import SavedViewResearch from "../views/faculty/saved_research/ViewResearch";
import ResearchApproval from "../views/faculty/faculty_in_charge/Index";
import UserApproval from "../views/faculty/user_approval/UserApproval";

import Student from "../views/student/Student";
import StudentIndex from "../views/student/home/Index";
import StudentViewResearch from "../views/student/home/ViewResearch";
import StudentMyResearchIndex from "../views/student/my_research/Index";
import StudentSavedResearchIndex from "../views/student/saved_research/Index";
import StudentSavedResearchView from "../views/student/saved_research/ViewResearch";
import StudentProfile from "../views/student/profile/Index";

import Logs from '../views/admin/logs/Logs'

import PageNotFound from "../layouts/not_found/PageNotFound";
import Offline from "../layouts/offline/Index";

import ResetPassword from "../views/public/ResetPassword";
import ForgotPassword from "../views/public/ForgotPassword";
import EmailConfirmed from "../views/public/EmailConfirmed";

import Course from "../views/admin/course/Course";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "/email-confirmed",
        element: <EmailConfirmed />,
      },
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <AdminDashboard />,
          },
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "college",
            element: <AdminCollege />,
          },
          {
            path: "department",
            element: <AdminDepartment />,
          },
          {
            path: "student",
            element: <AdminStudent />,
          },
          {
            path: "faculty",
            element: <AdminFaculty />,
          },
          {
            path: "faculty-in-charge",
            element: <AdminFacultyInCharge />,
          },
          {
            path: "researches",
            element: <ResearchApproval />,
          },
          {
            path: "home",
            element: <Index />,
          },
          {
            path: "logs",
            element: <Logs />,
          },
          { path: "home/view/:id", element: <ViewResearch /> },
          { path: "my-research", element: <ResearchIndex /> },
          { path: "saved-research", element: <SavedIndex /> },
          { path: "saved-research/view/:id", element: <SavedViewResearch /> },
          {
            path: "course",
            element: <Course />,
          },
        ],
      },
      {
        path: "/faculty",
        element: <Faculty />,
        children: [
          {
            path: "",
            element: <Index />,
          },
          // {
          //   path: "profile",
          //   element: <FacultyProfile />,
          // },
          {
            path: "home",
            element: <Index />,
          },
          { path: "home/view/:id", element: <ViewResearch /> },
          { path: "my-research", element: <ResearchIndex /> },
          { path: "saved-research", element: <SavedIndex /> },
          { path: "saved-research/view/:id", element: <SavedViewResearch /> },
          {
            path: "researches",
            element: <ResearchApproval />,
          },
          {
            path: "students",
            element: <UserApproval />,
          },
        ],
      },
      {
        path: "/student",
        element: <Student />,
        children: [
          {
            path: "",
            element: <StudentIndex />,
          },
          {
            path: "profile",
            element: <StudentProfile />,
          },
          {
            path: "home",
            element: <StudentIndex />,
          },
          {
            path: "home/view/:id",
            element: <StudentViewResearch />,
          },
          {
            path: "my-research",
            element: <StudentMyResearchIndex />,
          },
          {
            path: "saved-research",
            element: <StudentSavedResearchIndex />,
          },
          {
            path: "saved-research/view/:id",
            element: <StudentSavedResearchView />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "offline",
    element: <Offline />,
  },
]);
