import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import { EditBlogPage } from "@/components/EditBlogPage";
import { NotFound } from "@/components/Common/NotFound";

const EditBlog: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  let blogId: number | undefined;
  if (typeof slug === "string" && !isNaN(parseInt(slug))) {
    blogId = parseInt(slug);
  }

  return (
    <Layout title="Edit blog">
      {blogId ? <EditBlogPage id={blogId} /> : <NotFound />}
    </Layout>
  );
};

export default EditBlog;
