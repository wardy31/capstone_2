import { TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DownloadButton from "./button/DownloadButton";
import dateFormat, { time } from "../../../../utils/moment";
import usePDF from "../../../../hooks/usePDF";

function StationsPanel({
  stationRecords: { data, loading },
  locationRecords: { data: locationData, loading: locationLoading },
  onStation,
  onClear,
}) {
  const { toPDF, targetRef } = usePDF({ filename: "station-users-entry.pdf" });
  return (
    <TabPanel value={2}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography variant="caption" display={"block"}>
            Select Station
          </Typography>
          <Box>
            <FormControl sx={{ width: 320 }}>
              <Select
                size="small"
                sx={{ bgcolor: "white" }}
                onChange={onStation}
              >
                {!loading &&
                  data.map((m) => <MenuItem value={m.id}>{m.name}</MenuItem>)}
              </Select>
            </FormControl>
            <Button
              onClick={onClear}
              variant="outlined"
              sx={{ py: 0.8, ml: 1, textTransform: "capitalize" }}
            >
              Clear
            </Button>
          </Box>
        </Box>
        <DownloadButton onClick={toPDF}></DownloadButton>
      </Box>

      <Box mb={4}></Box>

      <Box ref={targetRef}>
        <Typography mb={2} variant="h6" fontWeight={"bold"}>
          Station User's Entry
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  Station
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                  }}
                  align="center"
                >
                  Time
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                  }}
                  align="center"
                >
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locationData.map((m) => (
                <TableRow key={m.id}>
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                  >{`${m.user.firstName} ${m.user.lastName}`}</TableCell>
                  <TableCell>{m.station.name}</TableCell>
                  <TableCell align="center">
                    {dateFormat(m.createdAt)}
                  </TableCell>
                  <TableCell align="center">{time(m.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </TabPanel>
  );
}

export default StationsPanel;
