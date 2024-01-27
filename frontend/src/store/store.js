import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import modelSlice from "../features/models/modelSlice";
import stationSlice from "../features/station/stationSlice";
import healthSlice from "../features/health_form/healthSlice";
import userSlice from "../features/user/userSlice";
import contactSlice from "../features/contacts/contactSlice";

export default configureStore({
  reducer: {
    contact:contactSlice,
    auth: authSlice,
    user: userSlice,
    model: modelSlice,
    station: stationSlice,
    healthForm: healthSlice,
  },
});
