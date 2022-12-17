import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { theme } from "@/lib/mui/theme";
import { Loading } from "@/components/Common/Loading";
import { useBlogEditor } from "./hooks/useBlogEditor";
import Link from "next/link";

const titleFontSize = theme.typography.h2.fontSize;

type Props = {
  id?: number;
};

export const BlogEditor = ({ id }: Props) => {
  const { onSubmit, fieldProps, isLoading, isSaving } = useBlogEditor(id);

  if (isLoading) return <Loading />;

  return (
    <>
      <Stack
        component="form"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2, pb: 1 }}
        onSubmit={onSubmit}
      >
        <TextField
          fullWidth
          label="title"
          variant="standard"
          inputProps={{ sx: { fontSize: titleFontSize } }}
          InputLabelProps={{ sx: { fontSize: titleFontSize } }}
          {...fieldProps.title}
        />
        <Stack direction="row" alignItems="center">
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSaving}
            sx={{ ml: 3 }}
          >
            Save
          </LoadingButton>
          {!!id && (
            <Link href={`/blogs/${id}`} style={{ whiteSpace: "nowrap" }}>
              <Button sx={{ ml: 3 }}>記事に戻る</Button>
            </Link>
          )}
        </Stack>
      </Stack>
      <TextField
        multiline
        fullWidth
        rows={30}
        inputProps={{ height: "100vh" }}
        {...fieldProps.body}
      />
    </>
  );
};
