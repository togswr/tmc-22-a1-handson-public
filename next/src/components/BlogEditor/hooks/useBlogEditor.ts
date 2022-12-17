import React from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, RegisterOptions } from "react-hook-form";
import { TextFieldProps } from "@mui/material";
import { BlogApi, BlogConverter } from "@/entities/Blog";

type FieldValues = {
  title: string;
  body: string;
};

type FieldProps = {
  title: TextFieldProps;
  body: TextFieldProps;
};

export const useBlogEditor = (blogId?: number) => {
  const isNew = blogId === undefined;
  const router = useRouter();

  const [blog, setBlog] = React.useState<FieldValues>();
  const [isLoading, setLoading] = React.useState(false);
  const [isSaving, setSaving] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: React.useMemo(() => blog, [blog]),
  });

  React.useEffect(() => {
    if (isNew) return;
    setLoading(true);
    BlogApi.show(blogId).then((res) => {
      const blog = BlogConverter.forShow(res.data);
      const fieldValues = { title: blog.title, body: blog.body };
      setBlog(fieldValues);
      reset(fieldValues);
      setLoading(false);
    });
  }, [blogId, isNew]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {}, [blog]);

  const fieldProps: FieldProps = {
    title: {
      error: !!errors.title,
      helperText: errors?.title?.message,
      ...register("title", titleRules),
    },
    body: {
      error: !!errors.body,
      helperText: errors?.body?.message,
      ...register("body", bodyRules),
    },
  };

  const onValid: SubmitHandler<FieldValues> = async (data) => {
    setSaving(true);
    if (isNew) {
      await BlogApi.create(data).then((res) => {
        const newBlogId = res.data.blog.id;
        router.push(`/blogs/${newBlogId}`);
      });
    } else {
      await BlogApi.update(blogId, data);
    }
    setSaving(false);
  };

  const onSubmit = handleSubmit(onValid);

  return { onSubmit, fieldProps, isLoading, isSaving };
};

const titleRules: RegisterOptions = {
  required: { value: true, message: "Required" },
  maxLength: { value: 255, message: "Up to 255 chars" },
};

const bodyRules: RegisterOptions = {
  required: { value: true, message: "Required" },
};
