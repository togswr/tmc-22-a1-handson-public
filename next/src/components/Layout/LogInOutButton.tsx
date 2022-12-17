import React from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const LogInOutButton = () => {
  const { user, logout } = useAuth({ middleware: "guest" });
  const [isLoading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return !user ? (
    <Link href="/login">
      <Button color="inherit">Login</Button>
    </Link>
  ) : (
    <LoadingButton loading={isLoading} color="inherit" onClick={handleLogout}>
      Logout
    </LoadingButton>
  );
};
