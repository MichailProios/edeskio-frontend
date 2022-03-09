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
  };
}
