import Vue from "vue";
import VueRouter from "vue-router";
// import DownLoadView from "@/views/DownLoadView.vue";
// Not Found
import  NotFound from "@/views/error/NotFound.vue"

//Admin
import HomeView from "../views/admin/HomeView.vue";
import LocationView from "../views/admin/LocationView.vue";
import StudentsView from "../views/admin/StudentsView.vue";
import PersonnelsView from "../views/admin/PersonnelsView.vue";
import LogRecordView from "../views/admin/LogRecordView.vue";
import DeclarationForm from "../views/admin/DeclarationForm.vue";
import AdminView from "../views/admin/AdminView.vue";
import UsersView from "../views/admin/UsersView.vue";
import ContactTraceView from "../views/admin/ContactTraceView.vue";
import ContactTraceNew from "../views/admin/ContactTraceNew.vue";
import Notifications from '../views/admin/NotificationsView.vue'

import ManageForm from "../views/admin/ManageForm.vue";
import DiseaseClassification from "../views/admin/DiseaseView.vue";

import ReportGeneration from "../views/admin/ReportGeneration.vue";
import CheckProfile from "@/views/admin/Profile/CheckProfile";
import EditProfile from "@/views/admin/Profile/EditProfile";

//Login
import LoginClinic from "@/views/Login/LoginClinic.vue";
import LoginUser from "@/views/Login/LoginUser.vue";
// import LoginStation from "@/views/Login/LoginStation.vue";

//User
import UserView from "@/views/user/UserView.vue";
import UserHomeView from "@/views/user/HomeView.vue";
import PersonalProfile from "@/views/user/pages/PersonalProfile";
import UserEditProfile from "@/views/user/pages/profile/EditProfile"
import LocationRecord from "@/views/user/pages/LocationRecord";
import HealthDeclarationForm from "@/views/user/pages/HealthDeclarationForm";
import FollowUps from "@/views/user/pages/FollowUps";
import UserRegister from "../views/UserRegister.vue";
//Clinic
import ClinicRegister from "../views/ClinicRegister.vue";
import StationViews from "../views/admin/StationView.vue";
import AdminFollowUps from "../views/admin/FollowUps.vue";
//manage
import ContactUser from "../views/admin/ManageContact/ContactUser.vue";
import TraceContact from "../views/admin/ManageContact/TraceContact.vue";
import IndexView from "../views/admin/ManageContact/IndexView.vue";
import ContactTraceNewView from "../views/admin/ViewTraceContact.vue";
import UserTraceContact from "../views/admin/ManageContact/UserTraceContact.vue";

//Station
// import StationIndexView from '../views/station/StationView.vue'
// import RecognitionView from '../views/station/RecognitionView.vue'

// import FaceRec from '@/components/FaceRec.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LoginUser",
    component: LoginUser,
  },
  {
    path: "/clinic-login",
    name: "clinic-login",
    component: LoginClinic,
  },
  // {
  //   path: "/station-login",
  //   name: "station-login",
  //   component: LoginStation,
  // },
  // {
  //   path: "/user-login",
  //   name: "user-login",
  //   component: LoginUser,
  // },
  {
    path: "/ClinicRegister",
    component: ClinicRegister,
  },
  {
    path: "/UserRegister",
    component: UserRegister,
  },
  {
    path: "/user",
    component: UserView,
    children: [
      {
        path: "",
        component: UserHomeView,
      },
      {
        path: "home",
        component: UserHomeView,
      },
      {
        path: "personal-profile",
        component: PersonalProfile,
        children:[
          {
            path:'',
            component:UserEditProfile,
          },
          {
            path:'profile',
            component:UserEditProfile
          }
        ]
      },
      {
        path: "location-record",
        component: LocationRecord,
      },
      {
        path:'health-declaration-form',
        component: HealthDeclarationForm
      },
      {
        path:'follow-ups',
        component: FollowUps
      }
    ],
  },
  {
    path: "/admin",
    component: AdminView,
    children: [
      {
        path: "",
        component: HomeView,
      },
      {
        path:"notifications",
        component:Notifications
      },
      {
        path: "users",
        component: UsersView,
      },
      {
        path: "manage",
        component: IndexView,
        children: [
          {
            path: " ",
            component: ContactUser,
          },
          {
            path: "contact-user",
            component: ContactUser,
          },
          {
            path: "trace-user/:id",
            component: TraceContact,
          },
          {
            path: "viewtrace/:id/:patientId",
            component: ContactTraceNewView,
          },
          {
            path: "check-users",
            component: UserTraceContact,
          },
          {
            path: "follow-ups",
            component: AdminFollowUps,
          },
        ],
      },
      {
        path: "trace",
        component: ContactTraceView,
        children: [
          {
            path: "newtrace",
            component: ContactTraceNew,
          },
          {
            path: "viewtrace",
            component: ContactTraceNewView,
          },
        ],
      },
      {
        path: "dashboard",
        component: HomeView,
      },
      {
        path: "location",
        component: LocationView,
      },
      {
        path: "students",
        component: StudentsView,
      },
      {
        path: "station",
        component: StationViews,
      },
      {
        path: "personnels",
        component: PersonnelsView,
      },
      {
        path: "logrecords",
        component: LogRecordView,
      },
      {
        path: "declarationform",
        component: DeclarationForm,
      },
      {
        path: "reportgeneration",
        component: ReportGeneration,
      },
      {
        path: "checkprofile/:id",
        component: CheckProfile,
      },
      {
        path: "editprofile",
        component: EditProfile,
      },
      {
        path: "manage-form",
        component: ManageForm,
      },
      {
        path: "manage-diseases",
        component: DiseaseClassification,
      },
    ],
  },
  {
    path: '*',
    component:NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
