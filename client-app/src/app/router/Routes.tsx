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
import MaximasDashboard from "../../features/futebolVirtualGames/maximas/MaximasDashboard";
import TimesDashboard from "../../features/futebolVirtualGames/times/TimesDashboard";
import LastGames from "../../features/futebolVirtualGames/lastGames/LastGames";
import MultiTimesDashboard from "../../features/futebolVirtualGames/times/MultiTimesDashboard";

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
      { path: "maximas", element: <MaximasDashboard /> },
      { path: "game-times", element: <TimesDashboard /> },
      { path: "game-multtimes", element: <MultiTimesDashboard /> },
      { path: "last-games", element: <LastGames /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
