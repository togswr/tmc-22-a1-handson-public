import { BlogPage } from "@/components/BlogPage";
import { NotFound } from "@/components/Common/NotFound";
import { Layout } from "@/components/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Blog: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  let blogId: number | undefined;
  if (typeof slug === "string" && !isNaN(parseInt(slug))) {
    blogId = parseInt(slug);
  }

  return <Layout>{blogId ? <BlogPage id={blogId} /> : <NotFound />}</Layout>;
};

export default Blog;
