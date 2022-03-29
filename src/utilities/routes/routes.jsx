import TechDashboard from "../../pages/TechDashboard/TechDashboard.jsx";
import Dashboard from "../../pages/Dashboard/Dashboard.jsx";
import AdminDashboard from "../../pages/AdminDashboard/AdminDashboard.jsx";
import HelpdeskAdmin from "../../pages/AdminDashboard/HelpdeskAdmin.jsx";

import LandingPage from "../../pages/LandingPage/LandingPage.jsx";
import TicketForm from "../../pages/SubmitTicket/TicketForm.jsx";

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
    component: <TicketForm />,
  },

  // Temporary routes
  {
    path: "/userdashboard",
    component: <Dashboard />,
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
