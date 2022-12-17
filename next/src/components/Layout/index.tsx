import * as React from "react";
import { Box } from "@mui/material";
import Head from "next/head";
import { AppBar } from "@/components/Layout/AppBar";
import { config } from "@/config";

type Props = {
  children: React.ReactNode;
  title?: string;
};
export const Layout = ({ children, title }: Props) => {
  const appName = config.APP_NAME;
  const pageTitle = title ? `${title} | ${appName}` : appName;

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar />

      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </div>
  );
};
