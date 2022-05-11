import Permissions from "../../pages/Permissions/Permissions";
import JoinOrganizationRequests from "../../pages/JoinOrganizationRequests/JoinOrganizationRequests.jsx";
import Tags from "../../pages/Tags/Tags.jsx";

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
  }
);

export default restrictedRoutes;
