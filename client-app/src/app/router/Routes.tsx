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
import BookmakerForm from "../../features/bookmaker/form/BookmakerForm";
import EventDashboard from "../../features/event/dashboard/EventDashboard";
import EventForm from "../../features/event/form/EventForm";
import RegisterDashboard from "../../features/register/dashboard/RegisterDashboard";
import RegisterForm from "../../features/register/form/RegisterForm";
import RankByProject from "../../features/sales/Rank/RankByProject";
import RankBySellerDashboard from "../../features/register/Ranks/RankBySeller/RankBySellerDashboard";
import RankREgisterByProjectDashboard from "../../features/register/Ranks/RankByProjects/RankREgisterByProjectDashboard";
import SPTDashBoard from "../../features/salesPerformanceTeam/DashBoard/SPTDashBoard";
import SalePerformanceTeamForm from "../../features/salesPerformanceTeam/Form/SalePerformanceTeamForm";
import RankSPTByConvertion from "../../features/salesPerformanceTeam/Rank/Conversion/RankSPTByConvertion";
import RankSPTByDeposit from "../../features/salesPerformanceTeam/Rank/Depoist/RankSPTByDeposit";
import RankSPTByTotalSales from "../../features/salesPerformanceTeam/Rank/Sales/RankSPTByTotalSales";
import RankDashboard from "../../features/salesPerformanceTeam/Rank/RankDashboard";
import ProjectWeightDashboard from "../../features/projectWeight/dashboard/ProjectWeightDashboard";
import ProjectWeightForm from "../../features/projectWeight/form/ProjectWeightFrom";

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
      { path: "sales/rankProject", element: <RankByProject />},
      { path: "products", element: <ProductDashBoard /> },
      { path: "products/save", element: <ProductForm /> },
      { path: "products/:id", element: <ProductForm /> },
      { path: "bookmakers", element: <BookmakerDashboard /> },
      { path: "bookmakers/save", element: <BookmakerForm /> },
      { path: "bookmakers/:id", element: <BookmakerForm /> },
      { path: "events", element: <EventDashboard /> },
      { path: "events/save", element: <EventForm /> },
      { path: "events/:id", element: <EventForm /> },
      { path: "registers", element: <RegisterDashboard /> },
      { path: "registers/save", element: <RegisterForm /> },
      { path: "registers/:id", element: <RegisterForm /> },
      { path: "registers/rankseller", element: <RankBySellerDashboard />} ,
      { path: "registers/rankProject", element: <RankREgisterByProjectDashboard /> },
      { path: "spt", element: <SPTDashBoard /> },
      { path: "spt/save", element: <SalePerformanceTeamForm /> },
      { path: "spt/save/:id", element: <SalePerformanceTeamForm /> },
      { path: "spt/ranks", element: <RankDashboard /> },
      { path: "spt/deposit-rank", element: <RankSPTByDeposit /> },
      { path: "spt/sales-rank", element: <RankSPTByTotalSales /> },
      { path: "projectweight/save", element: <ProjectWeightForm /> },
      { path: "projectweight", element: <ProjectWeightDashboard /> },
      { path: "/", element: <Navigate to="/activities" /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
