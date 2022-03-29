import TechDashboard from "../../pages/TechDashboard/TechDashboard.jsx";
import Dashboard from "../../pages/Dashboard/Dashboard.jsx";
import AdminDashboard from "../../pages/AdminDashboard/AdminDashboard.jsx";
import HelpdeskAdmin from "../../pages/AdminDashboard/HelpdeskAdmin.jsx";

import SubmitTicket from "../../pages/SubmitTicket/SubmitTicket.jsx";
import ViewTickets from "../../pages/ViewTickets/ViewTickets.jsx";

export const routes = [];

routes.push(
  {
    path: "/",
    component: <Dashboard />,
  },
  {
    path: "/Dashboard",
    component: <Dashboard />,
  },
  {
    path: "/Dashboard/SubmitTicket",
    component: <SubmitTicket />,
  },

  {
    path: "/Dashboard/ViewTickets",
    component: <ViewTickets />,
  }

  // Temporary routes
  // {
  //   path: "/userdashboard",
  //   component: <Dashboard />,
  // },

  // {
  //   path: "/techdashboard",
  //   component: <TechDashboard />,
  // },
  // {
  //   path: "/admindashboard",
  //   component: <AdminDashboard />,
  // },

  // {
  //   path: "/admin",
  //   component: <HelpdeskAdmin />,
  // }
);

export default routes;
