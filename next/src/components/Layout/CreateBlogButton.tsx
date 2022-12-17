import React from "react";
import Link from "next/link";
import { Button, ButtonProps } from "@mui/material";
import { theme } from "@/lib/mui/theme";
import { useAuth } from "@/hooks/useAuth";

export const CreateBlogButton = (props: ButtonProps) => {
  const { user } = useAuth({ middleware: "guest" });
  if (!user) return null;

  return (
    <Link href="/blogs/new">
      <Button
        color="inherit"
        variant="contained"
        {...props}
        sx={{
          color: theme.palette.primary.light,
          fontWeight: "bold",
          ...props.sx,
        }}
      >
        Create new Blog
      </Button>
    </Link>
  );
};
