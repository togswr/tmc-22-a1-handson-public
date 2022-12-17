import React from "react";
import {
  TextField,
  Paper,
  Typography,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Alert,
  Snackbar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useLoginForm } from "./hooks/useLoginForm";

export const LoginForm = () => {
  const { onSubmit, fieldProps, isLoading, isFailed } = useLoginForm();

  return (
    <Paper elevation={2} sx={{ p: 3 }} component="form" onSubmit={onSubmit}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Welcome to Simple Blog!
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          variant="outlined"
          label="Email"
          sx={{ width: "300px" }}
          {...fieldProps.email}
        />
      </Box>

      <Box sx={{ mb: 1 }}>
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          sx={{ width: "300px" }}
          {...fieldProps.password}
        />
      </Box>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...fieldProps.shouldRemember} />}
          label="Remember me"
        />
      </FormGroup>

      <Box sx={{ textAlign: "right" }}>
        <LoadingButton type="submit" variant="contained" loading={isLoading}>
          Login
        </LoadingButton>
      </Box>

      <Snackbar open={isFailed}>
        <Alert variant="filled" severity="error">
          ログインに失敗しました
        </Alert>
      </Snackbar>
    </Paper>
  );
};
