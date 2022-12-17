import axios from "@/lib/axios";
import { AxiosResponse } from "axios";
import { ApiDataUser, UserConverter, User } from "./User";

/*
 * Types
 */

export type Blog = {
  id: number;
  title: string;
  author: User;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ApiDataBlog = {
  id: number;
  title: string;
  author_id: number;
  author: ApiDataUser;
  body: string;
  created_at: string;
  updated_at: string;
};

export type ApiBlogShow = {
  blog: ApiDataBlog;
};

export type ApiBlogList = {
  blogs: ApiDataBlog[];
};

/*
 * Converter
 */

export const BlogConverter = {
  blog(data: ApiDataBlog): Blog {
    return {
      id: data.id,
      title: data.title,
      author: UserConverter.user(data.author),
      body: data.body,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  },

  forShow(data: ApiBlogShow): Blog {
    return BlogConverter.blog(data.blog);
  },

  forList(data: ApiBlogList): Blog[] {
    return data.blogs.map(BlogConverter.blog);
  },
};

/*
 * API
 */

export const BLOG_API_PATH = "/api/blogs";

export const BlogApi = {
  list() {
    return axios
      .get(BLOG_API_PATH)
      .then((res: AxiosResponse<ApiBlogList>) => res);
  },

  create(data: { title: string; body: string }) {
    return axios
      .post(BLOG_API_PATH, data)
      .then((res: AxiosResponse<ApiBlogShow>) => res);
  },

  update(id: number, data: { title: string; body: string }) {
    return axios
      .put(BlogApi.idPath(id), data)
      .then((res: AxiosResponse<ApiBlogShow>) => res);
  },

  show(id: number) {
    return axios
      .get(BlogApi.idPath(id))
      .then((res: AxiosResponse<ApiBlogShow>) => res);
  },

  delete(id: number) {
    return axios.delete(BlogApi.idPath(id)).then((res: AxiosResponse) => res);
  },

  idPath(id: number) {
    return `${BLOG_API_PATH}/${id}`;
  },
};
