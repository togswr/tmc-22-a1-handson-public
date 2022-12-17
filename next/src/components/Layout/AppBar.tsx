import * as React from "react";
import Link from "next/link";
import { Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { config } from "@/config";
import { LogInOutButton } from "./LogInOutButton";
import { CreateBlogButton } from "./CreateBlogButton";

export const AppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AutoStoriesIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Link href="/">
              <Typography variant="h6">{config.APP_NAME}</Typography>
            </Link>
          </Box>

          <Stack direction="row">
            <CreateBlogButton sx={{ mr: 3 }} />
            <LogInOutButton />
          </Stack>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};
