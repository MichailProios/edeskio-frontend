import Permissions from "../../pages/Permissions/Permissions";
import JoinOrganizationRequests from "../../pages/JoinOrganizationRequests/JoinOrganizationRequests.jsx";
import Tags from "../../pages/Tags/Tags.jsx";
import Statistics from "../../pages/Statistics/Statistics.jsx";

export const restrictedRoutes = [];

restrictedRoutes.push(
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
  {
    path: "/Statistics",
    component: <Statistics />,
  }
);

export default restrictedRoutes;
