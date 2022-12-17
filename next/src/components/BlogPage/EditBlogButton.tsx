import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

type Props = {
  id: number;
};

export const EditBlogButton = ({ id }: Props) => {
  return (
    <Link href={`/blogs/${id}/edit`}>
      <Button variant="contained">edit</Button>
    </Link>
  );
};
