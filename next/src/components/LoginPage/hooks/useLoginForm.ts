import React from "react";
import { useForm, SubmitHandler, RegisterOptions } from "react-hook-form";
import { AuthErrors, useAuth } from "@/hooks/useAuth";
import { CheckboxProps, TextFieldProps } from "@mui/material";

type FieldValues = {
  email: string;
  password: string;
  shouldRemember: boolean;
};

type FieldProps = {
  email: TextFieldProps;
  password: TextFieldProps;
  shouldRemember: CheckboxProps;
};

export const useLoginForm = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isFailed, setFailed] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<AuthErrors>();

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  React.useEffect(() => {
    if (formErrors === undefined || formErrors?.length === 0) {
      setFailed(false);
    } else {
      setFailed(true);
    }
  }, [formErrors]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onValid: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    await login({
      email: data.email,
      password: data.password,
      remember: data.shouldRemember,
      setErrors: setFormErrors,
      setStatus: () => {},
    });
    setLoading(false);
  };

  const onSubmit = handleSubmit(onValid);

  const fieldProps: FieldProps = {
    email: {
      error: !!errors.email,
      helperText: errors?.email?.message,
      ...register("email", emailRules),
    },

    password: {
      error: !!errors.password,
      helperText: errors?.password?.message,
      ...register("password", passwordRules),
    },

    shouldRemember: {
      ...register("shouldRemember"),
    },
  };

  return {
    onSubmit,
    fieldProps,
    isLoading,
    isFailed,
  };
};

const emailRules: RegisterOptions = {
  required: {
    value: true,
    message: "Required",
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid format",
  },
};

const passwordRules: RegisterOptions = {
  required: {
    value: true,
    message: "Required",
  },
};
