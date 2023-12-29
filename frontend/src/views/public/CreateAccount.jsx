import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getCollegeDepartment,
  createUser,
} from "../../store/actions/userAction";
import { getCourse } from "../../store/actions/courseAction";
import store from "../../store/store";
import { LoadingButton } from "@mui/lab";
import validate from "../../utils/validation";

function CreateAccount() {
  const { data, loading } = useSelector((state) => state.user.get);
  const { loading: createLoading, error } = useSelector(
    (state) => state.user.create
  );
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    roleID: "",
    contact: "",
    email: "",
    username: "",
    password: "",
    departmentId: null,
    collegeId: null,
    courseId: null,
    role: "",
  });
  const [departmentData, setDepartmentData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  console.log(form.courseId);
  const filterDepartment = (id) => {
    const result = data.find((d) => d.id == id);
    setDepartmentData(result.departments);
    console.log(result);
  };

  const filterCourses = (id) => {
    const result = departmentData.find((d) => d.id == id);
    setCoursesData(result.Courses);
    console.log(result);
  };

  const handleCreate = async () => {
    const res = await store.dispatch(createUser(form));
    if (res) {
      navigate("/");
    }
  };

  useEffect(() => {
    store.dispatch(getCollegeDepartment());
  }, []);

  const handleChange = (type, data) => {
    setForm({ ...form, [type]: data });
  };

  if (!data?.length) {
    <></>;
  }

  return (
    <Container sx={{}}>
      <Card
        sx={{ width: ["auto", 485], mx: "auto", px: 4, py: 3, boxShadow: 6 }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{ fontWeight: "bold", letterSpacing: 1.5 }}
            display={"block"}
          >
            Create Account
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "secondary.light" }}
            display={"block"}
          >
            Please provide all following information
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: "error.main" }}
            display={"inlince"}
            mr={0.6}
          >
            *
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: "secondary.light" }}
            display={"inline"}
          >
            required to fill
          </Typography>
        </Box>
        <Box sx={{}}>
          <Box>
            <Typography variant="subtitle2" display="inline">
              First Name
            </Typography>
            <Typography
              variant="subtitle2"
              display="inline"
              ml={0.6}
              color={"error"}
            >
              *
            </Typography>

            <TextField
              size="small"
              fullWidth
              error={Boolean(validate("firstName", error))}
              helperText={validate("firstName", error)}
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            ></TextField>
          </Box>

          <Box sx={{ mt: 1.8 }}>
            <Typography variant="subtitle2" display="inline">
              Middle Name
            </Typography>

            <Typography variant="caption" display="inline" ml={0.6}>
              (Optional)
            </Typography>

            <TextField
              size="small"
              fullWidth
              error={Boolean(validate("middleName", error))}
              helperText={validate("middleName", error)}
              value={form.middleName}
              onChange={(e) => handleChange("middleName", e.target.value)}
            ></TextField>
          </Box>

          <Box sx={{ mt: 1.8 }}>
            <Typography variant="subtitle2" display="inline">
              Last Name
            </Typography>

            <Typography
              variant="subtitle2"
              display="inline"
              ml={0.6}
              color={"error"}
            >
              *
            </Typography>

            <TextField
              size="small"
              fullWidth
              error={Boolean(validate("lastName", error))}
              helperText={validate("lastName", error)}
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            ></TextField>
          </Box>

          <Box sx={{ mt: 1.8 }}>
            <Typography variant="subtitle2" display={"inline"}>
              Mobile No.
            </Typography>
            <Typography variant="caption" display="inline" ml={0.6}>
              (Optional)
            </Typography>

            <TextField
              size="small"
              fullWidth
              type="tel"
              inputProps={{ maxlength: 11 }}
              error={Boolean(validate("contact", error))}
              helperText={validate("contact", error)}
              value={form.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
            ></TextField>
          </Box>
          <Box sx={{ mt: 1.8 }}>
            <Typography variant="subtitle2" display={"inline"}>
              Email
            </Typography>
            <Typography
              variant="caption"
              display="inline"
              ml={0.6}
              color={"error"}
            >
              *
            </Typography>
            <Typography
              variant="caption"
              display="inline"
              ml={1}
              sx={{color:"text.secondary"}}
            >
              ( only accept evsu mail )
            </Typography>

            <TextField
              size="small"
              fullWidth
              type="email"
              value={form.email}
              error={Boolean(validate("email", error))}
              helperText={validate("email", error)}
              onChange={(e) => handleChange("email", e.target.value)}
            ></TextField>
          </Box>

          <Box sx={{ mt: 1.8 }}>
            <Typography variant="subtitle2" display={"inline"}>
              Role
            </Typography>
            <Typography
              variant="caption"
              display="inline"
              ml={0.6}
              color={"error"}
            >
              *
            </Typography>

            <FormControl
              fullWidth
              size="small"
              error={Boolean(validate("role", error))}
            >
              {/* <InputLabel id="role">Role</InputLabel> */}
              <Select
                labelId="role"
                value={form.role}
                onChange={(e) => handleChange("role", e.target.value)}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="faculty">Faculty</MenuItem>
              </Select>
              <FormHelperText>{validate("role", error)}</FormHelperText>
            </FormControl>
          </Box>

          <Box sx={{ mt: 1.8 }}>
            <Typography variant="subtitle2" display={"inline"}>
              {form.role == "student" ? "Student ID" : "Faculty ID"}
            </Typography>
            <Typography
              variant="caption"
              display="inline"
              ml={0.6}
              color={"error"}
            >
              *
            </Typography>
            <TextField
              size="small"
              fullWidth
              type="text"
              value={form.roleID}
              error={Boolean(validate("roleID", error))}
              helperText={validate("roleID", error)}
              onChange={(e) => handleChange("roleID", e.target.value)}
            ></TextField>
          </Box>

          <Box sx={{ mt: 1.8 }}>
            <Typography variant="subtitle2" display={"inline"}>
              College
            </Typography>
            <Typography
              variant="caption"
              display="inline"
              ml={0.6}
              color={"error"}
            >
              *
            </Typography>
            <FormControl
              fullWidth
              size="small"
              error={Boolean(validate("collegeId", error))}
            >
              <Select
                labelId="college"
                value={form.collegeId}
                onChange={(e) => {
                  console.log(e.target.value);
                  setForm({ ...form, collegeId: e.target.value });
                  filterDepartment(e.target.value);
                }}
              >
                {data.map((m) => (
                  <MenuItem value={m.id} key={m.id}>
                    {m.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{validate("collegeId", error)}</FormHelperText>
            </FormControl>
          </Box>

          <Box sx={{ mt: 1.8 }}>
            <Typography variant="subtitle2" display={"inline"}>
              Department
            </Typography>
            <Typography
              variant="caption"
              display="inline"
              ml={0.6}
              color={"error"}
            >
              *
            </Typography>
            <FormControl
              fullWidth
              size="small"
              error={Boolean(validate("departmentId", error))}
            >
              <Select
                labelId="department"
                value={form.departmentId}
                onChange={(e) => {
                  console.log(e.target.value);
                  setForm({ ...form, departmentId: e.target.value });
                  filterCourses(e.target.value);
                }}
              >
                {departmentData.map((m) => (
                  <MenuItem value={m.id}>{m.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{validate("departmentId", error)}</FormHelperText>
            </FormControl>
          </Box>

          <Box sx={{ mt: 1.8 }}>
            <Typography variant="subtitle2" display={"inline"}>
              Courses
            </Typography>
            <Typography
              variant="caption"
              display="inline"
              ml={0.6}
              color={"error"}
            >
              *
            </Typography>
            <FormControl
              fullWidth
              size="small"
              error={Boolean(validate("courseId", error))}
            >
              <Select
                labelId="Course"
                value={form.courseId}
                onChange={(e) => {
                  console.log(e.target.value);
                  setForm({ ...form, courseId: e.target.value });
                }}
              >
                {coursesData.map((m) => (
                  <MenuItem value={m.id}>{m.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{validate("courseId", error)}</FormHelperText>
            </FormControl>
          </Box>

          <Box sx={{ mt: 1.8 }}>
            <Typography variant="subtitle2" display={"inline"}>
              Username
            </Typography>
            <Typography
              variant="caption"
              display="inline"
              ml={0.6}
              color={"error"}
            >
              *
            </Typography>
            <TextField
              size="small"
              fullWidth
              type="username"
              value={form.username}
              error={Boolean(validate("username", error))}
              helperText={validate("username", error)}
              onChange={(e) => handleChange("username", e.target.value)}
            ></TextField>
          </Box>

          <Box sx={{ mt: 1.8 }}>
            <Typography variant="subtitle2" display={"inline"}>
              Password
            </Typography>
            <Typography
              variant="caption"
              display="inline"
              ml={0.6}
              color={"error"}
            >
              *
            </Typography>

            <FormControl
              variant="outlined"
              sx={{ display: "block" }}
              fullWidth
              error={Boolean(validate("password", error))}
            >
              <OutlinedInput
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                fullWidth
                type={showPassword ? "text" : "password"}
                size="small"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              ></OutlinedInput>
              <FormHelperText>{validate("password", error)}</FormHelperText>
            </FormControl>
            {/* <TextField
              size="small"
              fullWidth
              type="password"
              value={form.password}
              error={Boolean(validate("password", error))}
              helperText={validate("password", error)}
              onChange={(e) => handleChange("password", e.target.value)}
            ></TextField> */}
          </Box>

          <LoadingButton
            loading={createLoading}
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            color="primary"
            onClick={() => handleCreate()}
          >
            <Typography
              sx={{
                fontSize: 14,
                letterSpacing: 1.5,
                py: 0.4,
                textTransform: "capitalize",
              }}
            >
              Create Account
            </Typography>
          </LoadingButton>
          <Button
            variant="text"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate("/")}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 14,
                letterSpacing: 1.5,
                py: 0.4,
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Typography>
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default CreateAccount;
