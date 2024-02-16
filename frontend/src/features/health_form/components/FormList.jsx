import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Card,
  CardContent,
  List,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function FormList({
  data,
  loading,
  handleForm,
  form,
  handleReset,
  hasForm,
  hasFormLoading,
  onSubmit,
  submitLoading,
}) {
  if (hasFormLoading) {
    return <></>;
  }

  return (
    <>
      {!hasForm.length ? (
        <>
          {data.map((m, i) => (
            <Card sx={{ mb: 1.2 }} key={m.id}>
              <CardContent>
                <Typography>
                  {i + 1}. {m.title}
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                  value={form.find((f) => f.id == m.id)?.answer}
                  onChange={(e) => handleForm(m.id, e.target.value)}
                ></TextField>
              </CardContent>
            </Card>
          ))}
          <LoadingButton
            disabled={!data.length}
            fullWidth
            variant="contained"
            size="large"
            sx={{ textTransform: "capitalize" }}
            onClick={onSubmit}
            loading={submitLoading}
          >
            Submit Form
          </LoadingButton>
          {/* <LoadingButton
        fullWidth
        size="large"
        sx={{ textTransform: "capitalize", color: "text.secondary" }}
        onClick={handleReset}
      >
        Reset
      </LoadingButton> */}
        </>
      ) : (
        <>
          <Alert color="primary" severity="success" variant="filled">
            <Typography>
              Thank you for submitting your response. The form will be open for
              tomorrow.
            </Typography>
          </Alert>
        </>
      )}
    </>
  );
}

export default FormList;
