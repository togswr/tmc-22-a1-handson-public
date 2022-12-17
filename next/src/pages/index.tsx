import { Layout } from "@/components/Layout";
import { BlogList } from "@/components/BlogList";

export default function Home() {
  return (
    <Layout title="Home">
      <BlogList />
    </Layout>
  );
}
