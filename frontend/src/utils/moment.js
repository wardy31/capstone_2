import moment from "moment";

const dateFormat = (date) => {
  return moment(date).format("MMM DD YYYY").toUpperCase();
};

export const month = (date) => {
  return moment(date).format("MMM").toUpperCase();
};

export const year = (date) => {
  return moment(date).format("YYYY").toUpperCase();
};

export const time = (date) => {
  return moment(date).format("hh:mm A").toString();
};

export default dateFormat;
