import Dashboard from "../../pages/Dashboard/Dashboard.jsx";
import SubmitTicket from "../../pages/SubmitTicket/SubmitTicket.jsx";
import SubmittedTickets from "../../pages/SubmittedTickets/SubmittedTickets.jsx";
import Permissions from "../../pages/Permissions/Permissions";
import ApprovalNeeded from "../../pages/ApprovalNeeded/ApprovalNeeded.jsx";
import JoinOrganizationRequests from "../../pages/JoinOrganizationRequests/JoinOrganizationRequests.jsx";

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
  {
    path: "/Dashboard/JoinOrganizationRequests",
    component: <JoinOrganizationRequests />,
  },

  //Approval Needed User
  {
    path: "*",
    component: <ApprovalNeeded />,
  }
);

export default routes;
