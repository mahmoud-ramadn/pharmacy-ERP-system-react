import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import DashboardLayout from "../layouts/Dashboard";
const Home = lazy(() => import("../pages/index"));
const Store = lazy(() => import("../pages/store"));
const CreateStore = lazy(() => import("../pages/store/create"));
const UpdateStore = lazy(() => import("../pages/store/update"));
const Suppliers = lazy(() => import("../pages/supplier"));
const SupplierCreate = lazy(() => import("../pages/supplier/create"));
const SupplierUpdate = lazy(() => import("../pages/supplier/update"));

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
      children: [
        {
          index: true,
          path: "",
          Component: Store,
        },
        {
          path: "create",
          Component: CreateStore,
        },
        {
          path: ":id/update",
          Component: UpdateStore,
        },
      ],
    },
    {
      path: "supplier",
      children: [
        {
          index: true,
          path: "",
          Component: Suppliers,
        },
        {
          path: "create",
          Component: SupplierCreate,
        },
        {
          path: ":id/update",
          Component: SupplierUpdate,
        }
      ],
    },
  ],
};
