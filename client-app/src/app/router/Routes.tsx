import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import ProfilePage from "../../features/profiles/ProfilePage";
import LoginForm from "../../features/users/LoginForm";
import App from "../layout/App";
import ProjectDashboard from "../../features/project/dashboard/ProjectDashboard";
import SellerDashboard from "../../features/sellers/Dashboard/SellerDashboard";
import SaleDashboard from "../../features/sales/Dashboard/SaleDashboard";
import RankSale from "../../features/sales/Rank/RankSale";
import ProjectForm from "../../features/project/form/ProjectForm";
import SellerForm from "../../features/sellers/form/SellerForm";
import SalesForm from "../../features/sales/Form/SalesForm";
import ProductDashBoard from "../../features/product/dashboard/ProductDashBoard";
import ProductForm from "../../features/product/Form/ProductForm";
import BookmakerDashboard from "../../features/bookmaker/dashboard/BookmakerDashboard";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      { path: "createActivity", element: <ActivityForm key="create" /> },
      { path: "manage/:id", element: <ActivityForm key="manage" /> },
      { path: "profiles/:username", element: <ProfilePage /> },
      { path: "login", element: <LoginForm /> },
      { path: "errors", element: <TestErrors /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "projects", element: <ProjectDashboard /> },
      { path: "projects/save", element: <ProjectForm /> },
      { path: "projects/:id", element: <ProjectForm /> },
      { path: "sellers", element: <SellerDashboard /> },
      { path: "sellers/save", element: <SellerForm /> },
      { path: "sellers/:id", element: <SellerForm /> },
      { path: "sales", element: <SaleDashboard /> },
      { path: "sales/save", element: <SalesForm /> },
      { path: "sales/rank", element: <RankSale /> },
      { path: "products", element: <ProductDashBoard /> },
      { path: "products/save", element: <ProductForm /> },
      { path: "products/:id", element: <ProductForm /> },
      { path: "bookmakers", element: <BookmakerDashboard /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
