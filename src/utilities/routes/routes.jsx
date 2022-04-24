import Dashboard from "../../pages/Dashboard/Dashboard.jsx";
import SubmitTicket from "../../pages/SubmitTicket/SubmitTicket.jsx";
import SubmittedTickets from "../../pages/SubmittedTickets/SubmittedTickets.jsx";
import Permissions from "../../pages/Permissions/Permissions";

import JoinOrganizationRequests from "../../pages/JoinOrganizationRequests/JoinOrganizationRequests.jsx";
import Tags from "../../pages/Tags/Tags.jsx";

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
  {
    path: "/Dashboard/ManageTags",
    component: <Tags />,
  },

  //Approval Needed User
  // {
  //   path: "*",
  //   component: <ApprovalNeeded />,
  // }
);

export default routes;
