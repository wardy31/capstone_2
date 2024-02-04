import { TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Paper,
  Table,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SimCardDownloadTwoToneIcon from "@mui/icons-material/SimCardDownloadTwoTone";
import dateFormat from "../../../../utils/moment";
import usePDF from "../../../../hooks/usePDF";

function FormResponsePanel({
  healthRecords: { data = [], loading },
  onResponse,
}) {
  const { toPDF, targetRef } = usePDF({ filename: "declaration-response.pdf" });

  console.log(data);

  return (
    <TabPanel value={1}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography variant="caption" sx={{ display: "block" }}>
            Date Response
          </Typography>
          <TextField
            size="small"
            type="date"
            sx={{ bgcolor: "white" }}
            onChange={onResponse}
          ></TextField>
        </Box>
        <Button
          onClick={toPDF}
          variant="contained"
          startIcon={<SimCardDownloadTwoToneIcon></SimCardDownloadTwoToneIcon>}
        >
          Download PDF
        </Button>
      </Box>

      <Box mb={4}></Box>

      {/* Result */}
      <Box ref={targetRef}>
        <Typography my={2} variant="h6" sx={{ fontWeight: "bold" }}>
          Declaration Responses
        </Typography>
        {!loading &&
          data.map((m, i) => (
            <Paper sx={{ px: 2, py: 2, mt: i == 0 ? "" : 2 }}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >{`${m.user.firstName} ${m.user.lastName}`}</Typography>

                <Typography
                  sx={{
                    fontSize: 16,
                    textTransform: "capitalize",
                  }}
                >{`${m.user.role} `}</Typography>

                <Typography
                  sx={{
                    fontSize: 16,
                    textTransform: "capitalize",
                    textAlign: "end",
                  }}
                >{`${dateFormat(m.createdAt)} `}</Typography>
              </Box>

              <Box>
                {m.UserAnswer.map((m, i) => (
                  <>
                    <Typography mt={2} variant="subtitle2">{`${i + 1}. ${
                      m.questionnaire.title
                    }`}</Typography>
                    <TextField
                      label="Answer"
                      value={m.answer}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      size="small"
                      sx={{ bgcolor: "primary.light", mt: 2 }}
                    ></TextField>
                  </>
                ))}
              </Box>
            </Paper>
          ))}
      </Box>
    </TabPanel>
  );
}

export default FormResponsePanel;
