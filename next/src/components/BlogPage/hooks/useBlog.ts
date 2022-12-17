import React from "react";
import { Blog, BlogApi, BlogConverter } from "@/entities/Blog";

export const useBlog = (id: number) => {
  const [blog, setBlog] = React.useState<Blog>();
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadBlog();
  }, []);

  const loadBlog = () => {
    setLoading(true);
    BlogApi.show(id)
      .then((res) => {
        setBlog(BlogConverter.forShow(res.data));
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  return { blog, isLoading, loadBlog };
};
