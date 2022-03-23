import TechDashboard from "../../pages/TechDashboard/TechDashboard.jsx";
import UserDashboard from "../../pages/UserDashboard/UserDashboard.jsx";
import AdminDashboard from "../../pages/AdminDashboard/AdminDashboard.jsx";
import HelpdeskAdmin from "../../pages/AdminDashboard/HelpdeskAdmin.jsx";

import LandingPage from "../../pages/LandingPage/LandingPage.jsx";

export const routes = [];

routes.push(
  {
    path: "/",
    component: <UserDashboard />,
  },
  {
    path: "/dashboard",
    component: <TechDashboard />,
  },

  // Temporary routes
  {
    path: "/userdashboard",
    component: <UserDashboard />,
  },
  {
    path: "/techdashboard",
    component: <TechDashboard />,
  },
  {
    path: "/admindashboard",
    component: <AdminDashboard />,
  },

  {
    path: "/admin",
    component: <HelpdeskAdmin />,
  }
);

export default routes;
