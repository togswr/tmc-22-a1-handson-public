import { Loading } from "@/components/Common/Loading";
import { BlogCard } from "./BlogCard";
import { useBlogs } from "./hooks/useBlogs";
import { NoBlogs } from "./NoBlogs";

export const BlogList = () => {
  const { blogs, isLoading } = useBlogs();

  if (isLoading) return <Loading />;

  if (blogs.length === 0) return <NoBlogs />;

  return (
    <>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </>
  );
};
