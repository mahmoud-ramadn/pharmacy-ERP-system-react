import { lazy } from "react";
import type { RouteObject } from "react-router";
import AuthLayout from "../layouts/Auth";
const Login = lazy(() => import("../pages/auth/login"));

export const AuthRoutes: RouteObject = {
  path: "",
  Component: AuthLayout,
  children: [
    {
      path: "login",
      Component: Login,
    },
  ],
};
