import { Grid } from "@mui/material";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "90vh" }}
    >
      <LoginForm />
    </Grid>
  );
};
