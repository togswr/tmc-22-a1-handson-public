import { Blog } from "@/entities/Blog";
import { formatDate } from "@/utils/formatDate";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

type Props = {
  blog: Blog;
};

export const BlogCard = ({ blog: { id, title, author, createdAt } }: Props) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardActionArea component={Link} href={`/blogs/${id}`}>
        <CardContent>
          <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h5" color="gray">
              {author.name}
            </Typography>
            <Typography sx={{ ml: 2 }}>
              created at {formatDate(createdAt)}
            </Typography>
          </Stack>
          <Typography variant="h3">{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
