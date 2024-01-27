import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import useValue from "../../hooks/useValue";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function TextInputPassword({
  value,
  onChange,
  error,
  helperText,
  size = "large",
}) {
  const { state: showPassword, handleChange: handlePassword } = useValue(false);

  return (
    <FormControl fullWidth error={error}>
      {/* <InputLabel></InputLabel> */}
      <OutlinedInput
        size={size}
        value={value}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment>
            <IconButton onClick={handlePassword}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
      ></OutlinedInput>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default TextInputPassword;
