import Dashboard from "../../pages/Dashboard/Dashboard.jsx";
import SubmitTicket from "../../pages/SubmitTicket/SubmitTicket.jsx";
import SubmittedTickets from "../../pages/SubmittedTickets/SubmittedTickets.jsx";
import NotFound from "../../components/NotFound/NotFound.jsx";

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
    path: "/Dashboard/SubmittedTickets",
    component: <SubmittedTickets />,
  },

  {
    path: "*",
    component: <NotFound />,
  }
);

export default routes;
