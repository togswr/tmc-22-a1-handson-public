import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { User } from "@/entities/User";

export type AuthErrors = { [key: string]: string[] } | [];
type SetErrors = (errors: AuthErrors) => void;
type SetStatus = (status: string | null) => void;

type Register = (props: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  setErrors: SetErrors;
}) => void;

type Login = (props: {
  email: string;
  password: string;
  remember: boolean;
  setErrors: SetErrors;
  setStatus: SetStatus;
}) => void;

type ForgotPassword = (props: {
  email: string;
  setErrors: SetErrors;
  setStatus: SetStatus;
}) => void;

type ResetPassword = (props: {
  email: string;
  password: string;
  password_confirmation: boolean;
  setErrors: SetErrors;
  setStatus: SetStatus;
}) => void;

type ResendEmailVerification = (props: { setStatus: SetStatus }) => void;

type Props = {
  middleware?: "guest" | "auth";
  redirectIfAuthenticated?: string;
};

export const useAuth = ({ middleware, redirectIfAuthenticated }: Props) => {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSWR<User>("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register: Register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const login: Login = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    await axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error: AxiosError<{ errors: AuthErrors }>) => {
        if (error?.response?.status !== 422) throw error;

        setErrors(error?.response?.data?.errors);
      });
  };

  const forgotPassword: ForgotPassword = async ({
    setErrors,
    setStatus,
    email,
  }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword: ResetPassword = async ({
    setErrors,
    setStatus,
    ...props
  }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: router.query.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification: ResendEmailVerification = ({ setStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (
      window.location.pathname === "/verify-email" &&
      user?.email_verified_at &&
      redirectIfAuthenticated
    )
      router.push(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
  }, [user, error]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
