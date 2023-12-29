import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";

import { Provider } from "react-redux";
import store from "./store/store.js";
import { registerSW } from "virtual:pwa-register";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import "@fontsource-variable/sora";

const theme = createTheme({
  typography: {
    // fontFamily: ["Quicksand Variable", "sans-serif"].join(","),
    fontFamily: ["Sora Variable", "sans-serif"].join(","),
    fontWeightRegular: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      // main: "#4A55A2",
      // main: "#2F58CD",
      // main: "#3A1078",
      main: "#13005A",
      light: "#FAFAFA",
    },
    secondary: {
      main: "#A73121",
    },
    success: {
      main: "#50CB93",
    },
    info: {
      main: "#1D5B79",
    },
    error: {
      main: "#B31312",
    },
  },
});

registerSW({ immediate: true, onOfflineReady() {} });

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode >
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
