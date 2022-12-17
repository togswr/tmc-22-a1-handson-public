import { Blog, BlogApi, BlogConverter } from "@/entities/Blog";
import React from "react";

export const useBlogs = () => {
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    setLoading(true);
    BlogApi.list()
      .then((res) => {
        setBlogs(BlogConverter.forList(res.data));
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  return { blogs, isLoading, loadBlogs };
};
