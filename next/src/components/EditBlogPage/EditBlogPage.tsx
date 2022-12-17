import React from "react";
import { BlogEditor } from "@/components/BlogEditor";

type Props = {
  id: number;
};

export const EditBlogPage = ({ id }: Props) => {
  return <BlogEditor id={id} />;
};
