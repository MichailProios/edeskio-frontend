import React from "react";

import LandingPage from "../pages/LandingPage/LandingPage.jsx";
import TechDashboard from "../pages/TechDashboard/TechDashboard.jsx";
import UserDashboard from "../pages/UserDashboard/UserDashboard.jsx";

export const routes = [];

routes.push(
  {
    path: "/",
    component: <LandingPage />,
  },
  {
    path: "/dashboard",
    component: <TechDashboard />,
  },
  /*
  {
    path: "/dashboard",
    component: <UserDashboard />,
  },
  */
);

export default routes;
