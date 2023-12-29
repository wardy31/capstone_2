import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResearch } from "../../../store/actions/researchAction";
import { setDialog } from "../../../store/reducers/researchReducer";
import store from "../../../store/store";
import AddIcon from "@mui/icons-material/Add";
import validate from "../../../utils/validation";
import ScanOCR from "../../attachments/ScanOCR";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  getCourse,
  getUserbyCourse,
} from "../../../store/actions/courseAction";
import { getCoursesByDepartmentId } from "../../../store/actions/courseAction";
import {
  getCollege,
  getDepartmentOfCollege,
} from "../../../store/actions/collegeAction";
import { getDepartment } from "../../../store/actions/departmentAction";

function AddModal() {
  const dispatch = useDispatch();
  const {
    data: { role },
  } = useSelector((state) => state.user.auth);

  const { dialog, loading, error } = useSelector(
    (state) => state.research.post
  );
  const { data: courseData, loading: courseLoading } = useSelector(
    (state) => state.course.get
  );

  const { data: collegeData, loading: collegeLoading } = useSelector(
    (state) => state.college.get
  );
  const { data: departmentData, loading: departmentLoading } = useSelector(
    (state) => state.college.department
  );

  const { data: courseDepartmentData, loading: courseDepartmentLoading } =
    useSelector((state) => state.course.department);

  const [form, setForm] = useState({
    title: "",
    abstract: "",
    file: null,
    paperType: "",
    month: "",
    year: "",
    authors: [],
    collegeId: "",
    departmentId: "",
    courseId: "",
  });

  const [result, setResult] = useState({
    title: "",
    abstract: "",
  });

  const handleResult = (data, type) => {
    setResult({ ...result, [type]: data });
  };

  const handleModal = () => {
    dispatch(setDialog({ type: "post", payload: !dialog }));
  };

  console.log("form", role);

  const handleForm = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("abstract", form.abstract);
    formData.append("paperType", form.paperType);
    formData.append("month", form.month);
    formData.append("year", form.year);
    formData.append("authors", JSON.stringify(form.authors));
    formData.append("file", form.file);

    const res = await store.dispatch(addResearch(formData));

    if (res) {
      handleModal();
    }
  };

  useEffect(() => {
    store.dispatch(getUserbyCourse());
    // store.dispatch(getCollege());
    // store.dispatch(getDepartment())
    // store.dispatch(getCourse())
  }, []);

  return (
    <>
      <Box>
        <Button
          size="small"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleModal()}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              py: 0.6,
              fontWeight: "bold",
              letterSpacing: 1,
              fontSize: 14,
            }}
          >
            Research
          </Typography>
        </Button>
      </Box>
      <Dialog open={dialog} maxWidth={"sm"}>
        <DialogTitle sx={{ bgcolor: "primary.main" }}>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Add Research
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box mb={1} mt={4} display="flex" alignItems="center">
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
            mb={1}
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography display="inline">Abstract</Typography>
              <Typography color="error" display="inline">
                *
              </Typography>
            </Box>
            <ScanOCR handleResult={handleResult} type="abstract" />
          </Box>

          {result.abstract.length != 0 && (
            <>
              <TextField
                fullWidth
                value={result.abstract}
                onChange={(e) =>
                  setResult({ ...result, abstract: e.target.value })
                }
                multiline
                // InputProps={{
                //   readOnly: true,
                // }}
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
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, abstract: e.target.value })}
          ></TextField>

          {role == "admin" && (
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <Box mb={1} mt={2}>
                  <Typography display="inline">College</Typography>
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
                    value={form.collegeId}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        collegeId: e.target.value,
                        departmentId: "",
                        courseId: "",
                      });
                      store.dispatch(getDepartmentOfCollege(e.target.value));
                    }}
                  >
                    {collegeData.length &&
                      collegeData.map((m) => (
                        <MenuItem value={m.id}>{m.name}</MenuItem>
                      ))}
                  </Select>

                  <FormHelperText>
                    {validate("paperType", error)}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Box mb={1} mt={2}>
                  <Typography display="inline">Department</Typography>
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
                    value={form.departmentId}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        departmentId: e.target.value,
                        courseId: "",
                      });
                      store.dispatch(getCoursesByDepartmentId(e.target.value));
                    }}
                  >
                    {departmentData.length &&
                      departmentData.map((m) => (
                        <MenuItem value={m.id}>{m.name}</MenuItem>
                      ))}
                  </Select>

                  <FormHelperText>
                    {validate("paperType", error)}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box mb={1} mt={2}>
                  <Typography display="inline">Course</Typography>
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
                    value={form.courseId}
                    onChange={(e) =>
                      setForm({ ...form, courseId: e.target.value })
                    }
                  >
                    {form.departmentId &&
                      courseDepartmentData.length &&
                      courseDepartmentData.map((m) => (
                        <MenuItem value={m.id}>{m.name}</MenuItem>
                      ))}
                  </Select>

                  <FormHelperText>
                    {validate("paperType", error)}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          )}

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
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              fullWidth
              value={form.paperType}
              options={["Capstone", "Thesis", "Case Study"]}
              onChange={(event, newValue) => {
                setForm({ ...form, paperType: newValue ?? "" });
                console.log(newValue);
              }}
              inputValue={form.paperType}
              onInputChange={(event, newInputValue) => {
                setForm({ ...form, paperType: newInputValue ?? "" });
              }}
              size="small"
              renderInput={(params) => <TextField {...params} />}
            ></Autocomplete>
            {/* <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form.paperType}
              onChange={(e) => setForm({ ...form, paperType: e.target.value })}
            >
              <MenuItem value={"Capstone"}>Capstone</MenuItem>
              <MenuItem value={"Thesis"}>Thesis</MenuItem>
              <MenuItem value={"Case Study"}>Case Study</MenuItem>
            </Select> */}

            <FormHelperText>{validate("paperType", error)}</FormHelperText>
          </FormControl>

          <Box mb={1} mt={2} display="flex" alignItems="center">
            <Typography>Authors </Typography>
            <Typography color="error" variant="caption">
              {" "}
              *{" "}
            </Typography>
          </Box>

          <FormControl fullWidth error={Boolean(validate("authors", error))}>
            <Autocomplete
              value={form.authors}
              isOptionEqualToValue={(opt, val) => opt.id === val.id}
              multiple
              fullWidth
              disabled={courseData.length ? false : true}
              id="checkboxes-tags-demo"
              options={courseData}
              disableCloseOnSelect
              onChange={(e, val) => setForm({ ...form, authors: val })}
              getOptionLabel={(option) =>
                `${option.lastName}, ${option.firstName}`
              }
              ChipProps={{
                color: "primary",
                sx: {
                  letterSpacing: 1.2,
                },
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  <ListItem>
                    <ListItemText
                      primary={`${option.lastName}, ${option.firstName}`}
                      secondary={option.role}
                      primaryTypographyProps={{ textTransform: "capitalize" }}
                      secondaryTypographyProps={{ textTransform: "capitalize" }}
                    ></ListItemText>
                  </ListItem>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={
                    courseData.length ? "Find Authors" : "No Authors"
                  }
                  size="small"
                  fullWidth
                  error={Boolean(validate("authors", error))}
                />
              )}
            />
            <FormHelperText>{validate("authors", error)}</FormHelperText>
          </FormControl>

          <Box mb={1} mt={2}>
            <Typography display="inline">Research Date</Typography>
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
            error={Boolean(validate("file", error))}
            helperText={validate("file", error)}
            // value={form.file}
            onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
            type="file"
            inputProps={{
              accept: ".pdf",
            }}
          ></TextField>

          {/* <Typography mb={1} mt={2}>
            Upload Cover Page
          </Typography>
          <TextField
            size="small"
            fullWidth
            error={Boolean(validate("cover", error))}
            helperText={validate("cover", error)}
            // value={form.cover}
            onChange={(e) => setForm({ ...form, cover: e.target.files[0] })}
            type="file"
            inputProps={{
              accept: ".png,.jpeg,.jpg",
            }}
          ></TextField> */}
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
            <Typography sx={{ textTransform: "capitalize" }}>Add</Typography>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddModal;
