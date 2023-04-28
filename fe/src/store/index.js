import Vue from "vue";
import Vuex from "vuex";
import face from "./modules/face";
import user from "./modules/user";
import followUps from "./modules/followUps";
import declaration from "./modules/declaration";
import clinic from "./modules/clinic";
import station from "./modules/stations";
import staff from "./modules/staffs";
import register from "./modules/register";
import record from "./modules/records";
import traceContact from "./modules/traceContact";
import location from "./modules/location";
import closeContact from "./modules/closeContact";
import match from "./modules/match";
import disease from "./modules/disease";
import questions from "./modules/questions";
import generates from "./modules/generates";
import notifications from "./modules/notifications";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notifications,
    generates,
    questions,
    face,
    user,
    match,
    followUps,
    declaration,
    clinic,
    station,
    staff,
    register,
    record,
    traceContact,
    location,
    closeContact,
    disease,
  },
});
