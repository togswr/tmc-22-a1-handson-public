import React from "react";
import { Stack, Typography } from "@mui/material";
import { formatDate } from "@/utils/formatDate";
import { Loading } from "@/components/Common/Loading";
import { NotFound } from "@/components/Common/NotFound";
import { useBlog } from "./hooks/useBlog";
import { BlogActionButtons } from "./BlogActionButtons";

type Props = {
  id: number;
};

export const BlogPage = ({ id }: Props) => {
  const { blog, isLoading } = useBlog(id);

  if (isLoading) return <Loading />;

  if (!blog) return <NotFound />;

  return (
    <>
      <Typography variant="h2" gutterBottom>
        {blog.title}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2, pb: 1, borderBottom: "1px solid gray" }}
      >
        <Stack direction="row" alignItems="center">
          <Typography variant="h5" color="gray">
            {blog.author.name}
          </Typography>
          <Typography sx={{ ml: 2 }}>{formatDate(blog.createdAt)}</Typography>
        </Stack>

        <BlogActionButtons blog={blog} />
      </Stack>
      <div dangerouslySetInnerHTML={{ __html: blog.body }} />
    </>
  );
};
