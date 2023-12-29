import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import router from "./routes/routes.jsx";
import store from "./store/store.js";

// Supports weights 100-900
import "@fontsource-variable/outfit";

const theme = createTheme({
  typography: {
    fontFamily: ["Outfit Variable", "sans-serif"].join(","),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
