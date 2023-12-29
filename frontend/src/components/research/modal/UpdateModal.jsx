import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateResearch } from "../../../store/actions/researchAction";
import { setDialog } from "../../../store/reducers/researchReducer";
import store from "../../../store/store";
import ScanOCR from "../../attachments/ScanOCR";
import validate from "../../../utils/validation";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { getUserbyCourse } from "../../../store/actions/courseAction";

function UpdateModal({ id, params, handleClose }) {
  const { dialog, loading, error } = useSelector((state) => state.research.put);
  const { data: courseData, loading: courseLoading } = useSelector(
    (state) => state.course.get
  );
  const { data: userData } = useSelector((state) => state.user.auth);

  const [form, setForm] = useState({
    title: "",
    abstract: "",
    month: "",
    year: "",
    paperType: "",
    file: null,
    cover: null,
    authors: [],
  });

  const [result, setResult] = useState({
    title: "",
    abstract: "",
  });

  const handleResult = (data, type) => {
    setResult({ ...result, [type]: data });
  };

  useEffect(() => {
    setForm({
      ...form,
      title: params?.title,
      abstract: params?.abstract,
      month: params?.month,
      year: params?.year,
      paperType: params?.paperType,
      authors: params?.researchAuthors?.length
        ? params?.researchAuthors
            .map((m) => m.user)
            .filter((f) => f.id != userData.id)
        : [],
      file: params.file,
      // cover: null,
    });
  }, [params]);

  useEffect(() => {
    store.dispatch(getUserbyCourse());
  }, []);

  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(setDialog({ type: "put", payload: !dialog }));
    handleClose();
  };

  const handleForm = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("abstract", form.abstract);
    formData.append("paperType", form.paperType);
    formData.append("month", form.month);
    formData.append("year", form.year);
    formData.append("authors", JSON.stringify(form.authors));
    formData.append("file", form.file);
    const res = await store.dispatch(updateResearch(id, formData));

    if (res) {
      handleModal();
    }
  };
  return (
    <>
      <Dialog open={dialog} maxWidth={"sm"}>
        <DialogTitle sx={{ bgcolor: "primary.main" }}>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Update Research
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display={"flex"} alignItems={"center"} mt={4} mb={1}>
            <Typography>Research Title</Typography>
            <Typography color="error">*</Typography>
          </Box>

          <TextField
            error={Boolean(validate("title", error))}
            helperText={validate("title", error)}
            value={form.title}
            size="small"
            fullWidth
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          ></TextField>

          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
            mt={2}
            mb={1}
          >
            <Box mb={1} mt={2}>
              <Typography display="inline">Abstract</Typography>
              <Typography color="error" display="inline">
                *
              </Typography>
            </Box>

            <ScanOCR handleResult={handleResult} type={"abstract"} />
          </Box>

          {result.abstract?.length != 0 && (
            <>
              <TextField
                fullWidth
                value={result.abstract}
                onChange={(e) => setResult({...result,abstract:e.target.value})}
                multiline
              ></TextField>
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 2, mt: 1 }}
                onClick={() => setResult({ ...result, abstract: "" })}
              >
                <Typography
                  textTransform={"capitalize"}
                  letterSpacing={1.5}
                  fontWeight={"bold"}
                  fontSize={12}
                  my={0.4}
                >
                  Clear
                </Typography>
              </Button>
            </>
          )}

          <TextField
            error={Boolean(validate("abstract", error))}
            helperText={validate("abstract", error)}
            size="small"
            fullWidth
            value={form.abstract}
            // multiline
            onChange={(e) => setForm({ ...form, abstract: e.target.value })}
          ></TextField>

          <Box mb={1} mt={2}>
            <Typography display="inline">Document Type</Typography>
            <Typography color="error" display="inline">
              *
            </Typography>
          </Box>
          <FormControl
            fullWidth
            dense
            error={Boolean(validate("paperType", error))}
          >
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form.paperType}
              onChange={(e) => setForm({ ...form, paperType: e.target.value })}
            >
              <MenuItem value={"Capstone"}>Capstone</MenuItem>
              <MenuItem value={"Thesis"}>Thesis</MenuItem>
              <MenuItem value={"Case Study"}>Case Study</MenuItem>
            </Select>

            <FormHelperText>{validate("paperType", error)}</FormHelperText>
          </FormControl>

          <Box mb={1} mt={2} display="flex" alignItems="center">
            <Typography>Authors </Typography>
            <Typography color="text.secondary" variant="caption" ml={1}>
              {" "}
              (optional){" "}
            </Typography>
          </Box>

          <Autocomplete
            value={form.authors}
            isOptionEqualToValue={(opt, val) => opt.id === val.id}
            multiple
            fullWidth
            disabled={courseData?.length ? false : true}
            id="checkboxes-tags-demo"
            options={courseData}
            disableCloseOnSelect
            onChange={(e, val) => setForm({ ...form, authors: val })}
            ChipProps={{
              color:"primary",
              sx: {
                letterSpacing: 1.2,
              },
            }}
            getOptionLabel={(option) =>
              `${option.lastName}, ${option.firstName}`
            }
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {`${option.lastName}, ${option.firstName}`}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                fullWidth
                placeholder={
                  courseData?.length ? "Find Authors" : "No Authors Detected"
                }
              />
            )}
          />

          <Box mb={1} mt={2}>
            <Typography display="inline">Upload Date</Typography>
            <Typography color="error" display="inline">
              *
            </Typography>
          </Box>
          <Box display={"flex"} gap={2}>
            <Box>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    slotProps={{
                      textField: {
                        value: moment(`${form.month}-1-2000`),
                        placeholder: "Month",
                        helperText: validate("month", error),
                        error: Boolean(validate("month", error)),
                        size: "small",
                        onChange: (e) =>
                          e
                            ? setForm({ ...form, month: e.month() + 1 })
                            : setForm({ ...form, month: "" }),
                      },
                    }}
                    views={["month"]}
                    onChange={(e) => setForm({ ...form, month: e.month() + 1 })}
                  ></DatePicker>
                </LocalizationProvider>
              </FormControl>
            </Box>

            <Box>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    slotProps={{
                      textField: {
                        value: moment(`1-1-${form.year}`),
                        placeholder: "Year",
                        helperText: validate("year", error),
                        error: Boolean(validate("year", error)),
                        size: "small",
                        onChange: (e) =>
                          e
                            ? setForm({ ...form, year: e.year() })
                            : setForm({ ...form, year: "" }),
                      },
                    }}
                    views={["year"]}
                    onChange={(e) => setForm({ ...form, year: e.year() })}
                  ></DatePicker>
                </LocalizationProvider>
              </FormControl>
            </Box>
          </Box>

          <Box mb={1} mt={2}>
            <Typography display="inline">Upload Paper</Typography>
            <Typography color="error" display="inline">
              *
            </Typography>
          </Box>
          <TextField
            size="small"
            fullWidth
            // value={form.file}
            onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
            type="file"
            inputProps={{
              accept: ".pdf",
            }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModal()} disabled={loading}>
            <Typography sx={{ textTransform: "capitalize" }}>Cancel</Typography>
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={() => handleForm()}
          >
            <Typography sx={{ textTransform: "capitalize" }}>Update</Typography>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdateModal;
