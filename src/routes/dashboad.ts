import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import DashboardLayout from "../layouts/Dashboard";
const Home = lazy(() => import("../pages/index"));
const Store = lazy(() => import("../pages/store"));
const CreateStore = lazy(() => import("../pages/store/create"));
const UpdateStore = lazy(() => import("../pages/store/update"));
export const DashboardRoutes: RouteObject = {
  path: "",
  Component: DashboardLayout,
  children: [
    {
      index: true,
      path: "",
      Component: Home,
    },
    {
      path: "store",
      Component: Store,
    },
    {
      path: "store/create",
      Component: CreateStore,
    },
    {
      path: "store/:id/update",
      Component: UpdateStore,
    },
  ],
};
