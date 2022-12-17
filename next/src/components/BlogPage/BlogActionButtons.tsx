import React from "react";
import { Stack } from "@mui/material";
import { Blog } from "@/entities/Blog";
import { useIsOwnBlog } from "@/hooks/useIsOwnBlog";
import { DeleteBlogButton } from "./DeleteBlogButton";
import { EditBlogButton } from "./EditBlogButton";

type Props = {
  blog: Blog;
};

export const BlogActionButtons = ({ blog }: Props) => {
  const isOwn = useIsOwnBlog(blog);

  if (!isOwn) return null;

  return (
    <Stack direction="row" alignItems="center">
      <EditBlogButton id={blog.id} />
      <DeleteBlogButton id={blog.id} />
    </Stack>
  );
};
