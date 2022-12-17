import { Blog } from "@/entities/Blog";
import { useAuth } from "./useAuth";

export const useIsOwnBlog = (blog?: Blog) => {
  const { user } = useAuth({ middleware: "guest" });

  const currentUserId = user?.id;
  const blogAuthorId = blog?.author.id;

  // return文でのundefined === undefined を防ぐ
  if (!currentUserId || !blogAuthorId) {
    return false;
  }

  return currentUserId === blogAuthorId;
};
