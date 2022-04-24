export let endpoints;

if (
  window.location.hostname === "edeskio.com" ||
  window.location.hostname === "www.edeskio.com"
) {
  endpoints = {
    registerUserNewOrganization:
      "https://edeskio.com:8443/api/edeskio/post_tblUsers_tblOrganization_Register_NewOrganization",
    registerUserExistingOrganization:
      "https://edeskio.com:8443/api/edeskio/post_tblUsers_tblOrganization_Register_ExistingOrganization",
    loginUser: "https://edeskio.com:8443/login",
    userSession: "https://edeskio.com:8443/user",
    organizationsAll:
      "https://edeskio.com:8443/api/edeskio/get_tblOrganizations_All",
    user: "https://edeskio.com:8443/api/edeskio/get_tblUser",
    tagsAll: "https://edeskio.com:8443/api/edeskio/get_tblTags_All",
    ticketsAll: "https://edeskio.com:8443/api/edeskio/get_tblTickets",
    newTicket: "https://edeskio.com:8443/api/edeskio/post_tblTickets_NewTicket",
    usersAll: "https://edeskio.com:8443/api/edeskio/get_tblUsers_All",
    assignTicket:
      "https://edeskio.com:8443/api/edeskio/put_tblTickets_Assign",
    autoAssignTicket: "https://edeskio.com:8443/api/edeskio/put_tblTickets_AutoAssign",
    rolesAll: "https://edeskio.com:8443/api/edeskio/get_tblRoles_All",
    permissionsUpdate:
      "https://edeskio.com:8443/api/edeskio/put_tblPermissions",
    expertiseTags: "https://edeskio.com:8443/api/edeskio/post_tblExpertiseTags",
    getExpertiseTags:
      "https://edeskio.com:8443/api/edeskio/get_tblExpertiseTags_One",
    approved: "https://edeskio.com:8443/api/edeskio/put_tblUsers_Approved",
    getTechniciansAssign: "https://edeskio.com:8443/api/edeskio/get_TechniciansAssignInfo",
    postTags: "https://edeskio.com:8443/api/edeskio/post_tblTags_NewTag",
    deleteTag: "https://edeskio.com:8443/api/edeskio/delete_tblTags",
    putTags: "https://edeskio.com:8443/api/edeskio/put_tblTags_ManageTags",
    putTagCategory:"https://edeskio.com:8443/api/edeskio/put_tblTagCategories_ManageTags",
  };
} else if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === ""
) {
  endpoints = {
    registerUserNewOrganization:
      "https://edeskio.com:8443/api/edeskio/post_tblUsers_tblOrganization_Register_NewOrganization",
    registerUserExistingOrganization:
      "https://edeskio.com:8443/api/edeskio/post_tblUsers_tblOrganization_Register_ExistingOrganization",
    loginUser: "https://edeskio.com:8443/login",
    userSession: "https://edeskio.com:8443/user",
    organizationsAll:
      "https://edeskio.com:8443/api/edeskio/get_tblOrganizations_All",
    user: "https://edeskio.com:8443/api/edeskio/get_tblUser",
    tagsAll: "https://edeskio.com:8443/api/edeskio/get_tblTags_All",
    newTicket: "https://edeskio.com:8443/api/edeskio/post_tblTickets_NewTicket",
    ticketsAll: "https://edeskio.com:8443/api/edeskio/get_tblTickets",
    usersAll: "https://edeskio.com:8443/api/edeskio/get_tblUsers_All",
    assignTicket:
      "https://edeskio.com:8443/api/edeskio/put_tblTickets_Assign",
    autoAssignTicket: "https://edeskio.com:8443/api/edeskio/put_tblTickets_AutoAssign",
    rolesAll: "https://edeskio.com:8443/api/edeskio/get_tblRoles_All",
    permissionsUpdate:
      "https://edeskio.com:8443/api/edeskio/put_tblPermissions",
    expertiseTags: "https://edeskio.com:8443/api/edeskio/post_tblExpertiseTags",
    getExpertiseTags:
      "https://edeskio.com:8443/api/edeskio/get_tblExpertiseTags_One",
    approved: "https://edeskio.com:8443/api/edeskio/put_tblUsers_Approved",
    getTechniciansAssign: "https://edeskio.com:8443/api/edeskio/get_TechniciansAssignInfo",
    postTags: "https://edeskio.com:8443/api/edeskio/post_tblTags_NewTag",
    deleteTag: "https://edeskio.com:8443/api/edeskio/delete_tblTags",
    putTags: "https://edeskio.com:8443/api/edeskio/put_tblTags_ManageTags",
    putTagCategory:"https://edeskio.com:8443/api/edeskio/put_tblTagCategories_ManageTags",
  };
} else {
  endpoints = {
    registerUserNewOrganization:
      "https://edeskio.com:8443/api/edeskio/post_tblUsers_tblOrganization_Register_NewOrganization",
    registerUserExistingOrganization:
      "https://edeskio.com:8443/api/edeskio/post_tblUsers_tblOrganization_Register_ExistingOrganization",
    loginUser: "https://edeskio.com:8443/login",
    userSession: "https://edeskio.com:8443/user",
    organizationsAll:
      "https://edeskio.com:8443/api/edeskio/get_tblOrganizations_All",
    user: "https://edeskio.com:8443/api/edeskio/get_tblUser",
    tagsAll: "https://edeskio.com:8443/api/edeskio/get_tblTags_All",
    newTicket: "https://edeskio.com:8443/api/edeskio/post_tblTickets_NewTicket",
    ticketsAll: "https://edeskio.com:8443/api/edeskio/get_tblTickets",
    usersAll: "https://edeskio.com:8443/api/edeskio/get_tblUsers_All",
    assignTicket:
      "https://edeskio.com:8443/api/edeskio/put_tblTickets_Assign",
    autoAssignTicket: "https://edeskio.com:8443/api/edeskio/put_tblTickets_AutoAssign",
    rolesAll: "https://edeskio.com:8443/api/edeskio/get_tblRoles_All",
    permissionsUpdate:
      "https://edeskio.com:8443/api/edeskio/put_tblPermissions",
    expertiseTags: "https://edeskio.com:8443/api/edeskio/post_tblExpertiseTags",
    getExpertiseTags:
      "https://edeskio.com:8443/api/edeskio/get_tblExpertiseTags_One",
    approved: "https://edeskio.com:8443/api/edeskio/put_tblUsers_Approved",
    getTechniciansAssign: "https://edeskio.com:8443/api/edeskio/get_TechniciansAssignInfo",
    postTags: "https://edeskio.com:8443/api/edeskio/post_tblTags_NewTag",
    deleteTag: "https://edeskio.com:8443/api/edeskio/delete_tblTags",
    putTags: "https://edeskio.com:8443/api/edeskio/put_tblTags_ManageTags",
    putTagCategory:"https://edeskio.com:8443/api/edeskio/put_tblTagCategories_ManageTags",
  };
}
