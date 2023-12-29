import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import store from "../../store/store";
import { userEmailVerification } from "../../store/actions/userAction";
import { useSelector } from "react-redux";

function EmailConfirmed() {
  const { loading, error } = useSelector(
    (state) => state.user.emailConfirmation
  );
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const queryParams = new URLSearchParams(location.search);
      const queryValue = queryParams.get("token");

      console.log("Query Parameter - query:", queryValue);

      store.dispatch(userEmailVerification(queryValue));
    })();
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <>
      {error ? (
        <Box sx={{ textAlign: "center", pt: 25 }}>
          {" "}
          <Typography
            variant="h5"
            fontWeight={"bold"}
            textTransform={1.5}
            color="primary"
          >
            Token is invalid
          </Typography>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", pt: 25 }}>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            textTransform={1.5}
            color="primary"
          >
            Your email has been verified.
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight={"bold"}
            textTransform={1.5}
            color="text.disabled"
          >
            Go back to login page and wait for your account approval
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            LinkComponent={Link}
            to="/"
          >
            <Typography variant="button" textTransform={"capitalize"}>
              Go to login page
            </Typography>
          </Button>
        </Box>
      )}
    </>
  );
}

export default EmailConfirmed;
