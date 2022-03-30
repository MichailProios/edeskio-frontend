import Dashboard from "../../pages/Dashboard/Dashboard.jsx";
import SubmitTicket from "../../pages/SubmitTicket/SubmitTicket.jsx";
import SubmittedTickets from "../../pages/SumbittedTickets/SumbittedTickets.jsx";
import Permissions from "../../pages/Permissions/Permissions";
import ApprovalNeeded from "../../pages/ApprovalNeeded/ApprovalNeeded.jsx";

export const routes = [];

routes.push(
  //basic user routes
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

  //User/Tech Routes
  {
    path: "/Dashboard/SubmittedTickets",
    component: <SubmittedTickets />,
  },

  //Tech/Admin Routes

  //Admin only routes
  {
    path: "/Dashboard/Permissions",
    component: <Permissions />,
  },

  //Approval Needed User
  {
    path: "*",
    component: <ApprovalNeeded />,
  }
);

export default routes;
