import axios from "axios";
import {
  POST_USER_LOGIN_REQUEST,
  POST_USER_LOGIN_SUCCESS,
  POST_USER_LOGIN_FAILURE,
  GET_USER_SESSION_FAILURE,
  GET_USER_SESSION_REQUEST,
  GET_USER_SESSION_SUCCESS,
  GET_USER_ORGANIZATIONS_REQUEST,
  GET_USER_ORGANIZATIONS_SUCCESS,
  GET_USER_ORGANIZATIONS_FAILURE,
  POST_USER_REGISTER_NEW_ORGANIZAITON_REQUEST,
  POST_USER_REGISTER_NEW_ORGANIZAITON_SUCCESS,
  POST_USER_REGISTER_NEW_ORGANIZAITON_FAILURE,
  POST_USER_REGISTER_EXISTING_ORGANIZAITON_REQUEST,
  POST_USER_REGISTER_EXISTING_ORGANIZAITON_SUCCESS,
  POST_USER_REGISTER_EXISTING_ORGANIZAITON_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_ALL_TAGS_REQUEST,
  GET_ALL_TAGS_SUCCESS,
  GET_ALL_TAGS_FAILURE,
  POST_TICKETS_NEW_TICKET_REQUEST,
  POST_TICKETS_NEW_TICKET_SUCCESS,
  POST_TICKETS_NEW_TICKET_FAILURE,
  POST_EXPERTISE_TAGS_REQUEST,
  POST_EXPERTISE_TAGS_SUCCESS,
  POST_EXPERTISE_TAGS_FAILURE,
  GET_EXPERTISE_TAGS_REQUEST,
  GET_EXPERTISE_TAGS_SUCCESS,
  GET_EXPERTISE_TAGS_FAILURE,
  GET_TICKETS_REQUEST,
  GET_TICKETS_SUCCESS,
  GET_TICKETS_FAILURE,
  PUT_TICKETS_ASSIGN_REQUEST,
  PUT_TICKETS_ASSIGN_SUCCESS,
  PUT_TICKETS_ASSIGN_FAILURE,
  PUT_TICKETS_AUTO_ASSIGN_REQUEST,
  PUT_TICKETS_AUTO_ASSIGN_SUCCESS,
  PUT_TICKETS_AUTO_ASSIGN_FAILURE,
  GET_USER_ALL_FAILURE,
  GET_USER_ALL_SUCCESS,
  GET_USER_ALL_REQUEST,
  GET_TECHNICIANS_ASSIGN_REQUEST,
  GET_TECHNICIANS_ASSIGN_SUCCESS,
  GET_TECHNICIANS_ASSIGN_FAILURE,
  GET_PERMISSIONS_ALL_REQUEST,
  GET_PERMISSIONS_ALL_SUCCESS,
  GET_PERMISSIONS_ALL_FAILURE,
  PUT_PERMISSIONS_REQUEST,
  PUT_PERMISSIONS_SUCCESS,
  PUT_PERMISSIONS_FAILURE,
  PUT_USER_APPROVED_REQUEST,
  PUT_USER_APPROVED_SUCCESS,
  PUT_USER_APPROVED_FAILURE,
  POST_TAGS_REQUEST,
  POST_TAGS_SUCCESS,
  POST_TAGS_FAILURE,
  DELETE_TAG_REQUEST,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_FAILURE,
  PUT_TAGS_SUCCESS,
  PUT_TAGS_FAILURE,
  PUT_TAGS_REQUEST,
  PUT_TAG_CATEGORIES_REQUEST,
  PUT_TAG_CATEGORIES_SUCCESS,
  PUT_TAG_CATEGORIES_FAILURE,
  PUT_TICKET_PRIORITY_REQUEST,
  PUT_TICKET_PRIORITY_SUCCESS,
  PUT_TICKET_PRIORITY_FAILURE,
  USER_LOGOUT,
  POST_TAG_CATEGORY_REQUEST,
  POST_TAG_CATEGORY_SUCCESS,
  POST_TAG_CATEGORY_FAILURE,
  GET_TAG_CATEGORIES_REQUEST,
  GET_TAG_CATEGORIES_SUCCESS,
  NOTIFICATIONS_SUCCESS,
  NOTIFICATION_CLEAR,
  GET_TAG_CATEGORIES_FAILURE,
} from "./userTypes";

import { store } from "../store";

import { endpoints } from "./userEndpoints";

/**************************************************************************************************************/
export const postUserLoginAction = (username, password) => {
  return async (dispatch) => {
    dispatch(postUserLoginRequest());
    await postUserLoginWithAxios(username, password)
      .then((response) => {
        dispatch(postUserLoginSuccess(response));
      })
      .catch((error) => {
        dispatch(postUserLoginFailure(error.message));
      });
  };
};

const postUserLoginWithAxios = async (username, password) => {
  var user = [];

  await postUserLogin(username, password).then((response) => {
    user.push(response);
  });

  // await getUserSession().then((response) => {
  //   user.push(response);
  // });

  return {
    user,
  };
};

const postUserLogin = (username, password) => {
  return axios.post(
    endpoints.loginUser,
    {
      username: username,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    }
  );
};

const postUserLoginRequest = () => {
  return {
    type: POST_USER_LOGIN_REQUEST,
  };
};

const postUserLoginSuccess = (data) => {
  // alert("Authorized");
  return {
    type: POST_USER_LOGIN_SUCCESS,
    payload: data,
  };
};

const postUserLoginFailure = (error) => {
  // alert("Not Authorized");
  return {
    type: POST_USER_LOGIN_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const getUserSessionAction = () => {
  return async (dispatch) => {
    dispatch(getUserSessionRequest());
    await getUserSessionWithAxios()
      .then((response) => {
        dispatch(getUserSessionSuccess(response));
      })
      .catch((error) => {
        dispatch(getUserSessionFailure(error.message));
      });
  };
};

const getUserSessionWithAxios = async () => {
  var session = [];

  // await postUserLogin(username, password).then((response) => {
  //   user.push(response);
  // });

  await getUserSession().then((response) => {
    session.push(response);
  });

  return {
    session,
  };
};

const getUserSession = () => {
  return axios.get(endpoints.userSession, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getUserSessionRequest = () => {
  return {
    type: GET_USER_SESSION_REQUEST,
  };
};

const getUserSessionSuccess = (data) => {
  // alert("Authorized");
  return {
    type: GET_USER_SESSION_SUCCESS,
    payload: data,
  };
};

const getUserSessionFailure = (error) => {
  // alert("Not Authorized");
  return {
    type: GET_USER_SESSION_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const getPermissionsAllAction = (organizationID) => {
  return async (dispatch) => {
    dispatch(getPermissionsAllRequest());
    await getPermissionsAllWithAxios(organizationID)
      .then((response) => {
        dispatch(getPermissionsAllSuccess(response));
      })
      .catch((error) => {
        dispatch(getPermissionsAllFailure(error.message));
      });
  };
};

const getPermissionsAllWithAxios = async (organizationID) => {
  var roles = [];

  // await postUserLogin().then((response) => {
  //   user.push(response);
  // });

  await getPermissionsAll(organizationID).then((response) => {
    roles.push(response);
  });

  return {
    roles,
  };
};

const getPermissionsAll = (organizationID) => {
  return axios.get(endpoints.rolesAll, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      organizationID: organizationID,
    },
  });
};

const getPermissionsAllRequest = () => {
  return {
    type: GET_PERMISSIONS_ALL_REQUEST,
  };
};

const getPermissionsAllSuccess = (data) => {
  // alert("Authorized");
  return {
    type: GET_PERMISSIONS_ALL_SUCCESS,
    payload: data,
  };
};

const getPermissionsAllFailure = (error) => {
  // alert("Not Authorized");
  return {
    type: GET_PERMISSIONS_ALL_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const getUserOrganizationAction = () => {
  return async (dispatch) => {
    dispatch(getUserOrganizationRequest());
    await getUserOrganizationWithAxios()
      .then((response) => {
        dispatch(getUserOrganizationSuccess(response));
      })
      .catch((error) => {
        dispatch(getUserOrganizationFailure(error.message));
      });
  };
};

const getUserOrganizationWithAxios = async () => {
  var organizations = [];

  await getUserOrganizations().then((response) => {
    organizations.push(response);
  });

  return {
    organizations,
  };
};

const getUserOrganizations = (username, password) => {
  return axios.get(endpoints.organizationsAll, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getUserOrganizationRequest = () => {
  return {
    type: GET_USER_ORGANIZATIONS_REQUEST,
  };
};

const getUserOrganizationSuccess = (data) => {
  return {
    type: GET_USER_ORGANIZATIONS_SUCCESS,
    payload: data,
  };
};

const getUserOrganizationFailure = (error) => {
  return {
    type: GET_USER_ORGANIZATIONS_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const getUserAction = (username) => {
  return async (dispatch) => {
    dispatch(getUserRequest());
    await getUserWithAxios(username)
      .then((response) => {
        dispatch(getUserSuccess(response));
      })
      .catch((error) => {
        dispatch(getUserFailure(error.message));
      });
  };
};

const getUserWithAxios = async (username) => {
  var user = [];

  await getUser(username).then((response) => {
    user.push(response);
  });

  return {
    user,
  };
};

const getUser = (username) => {
  return axios.get(endpoints.user, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      username,
    },
  });
};

const getUserRequest = () => {
  return {
    type: GET_USER_REQUEST,
  };
};

const getUserSuccess = (data) => {
  return {
    type: GET_USER_SUCCESS,
    payload: data,
  };
};

const getUserFailure = (error) => {
  return {
    type: GET_USER_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const getTicketsAction = (organizationID) => {
  return async (dispatch) => {
    dispatch(getTicketsRequest());

    return new Promise(async (resolve, reject) => {
      await getTicketsWithAxios(organizationID)
        .then((response) => {
          dispatch(getTicketsSuccess(response));
          return resolve(response);
        })
        .catch((error) => {
          dispatch(getTicketsFailure(error.message));
          return reject(error);
        });
    });
  };
};

const getTicketsWithAxios = async (organizationID) => {
  var tickets = [];

  await getTickets(organizationID).then((response) => {
    tickets.push(response);
  });

  return {
    tickets,
  };
};

const getTickets = (organizationID) => {
  return axios.get(endpoints.ticketsAll, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      OrganizationID: organizationID,
    },
  });
};

const getTicketsRequest = () => {
  return {
    type: GET_TICKETS_REQUEST,
  };
};

const getTicketsSuccess = (data) => {
  return {
    type: GET_TICKETS_SUCCESS,
    payload: data,
  };
};

const getTicketsFailure = (error) => {
  return {
    type: GET_TICKETS_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const getUsersAllAction = (organizationID) => {
  return async (dispatch) => {
    dispatch(getUsersAllRequest());
    await getUsersAllWithAxios(organizationID)
      .then((response) => {
        dispatch(getUsersAllSuccess(response));
      })
      .catch((error) => {
        dispatch(getUsersAllFailure(error.message));
      });
  };
};

const getUsersAllWithAxios = async (organizationID) => {
  var users = [];

  await getUsersAll(organizationID).then((response) => {
    users.push(response);
  });

  return {
    users,
  };
};

const getUsersAll = (organizationID) => {
  return axios.get(endpoints.usersAll, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      organizationID: organizationID,
    },
  });
};

const getUsersAllRequest = () => {
  return {
    type: GET_USER_ALL_REQUEST,
  };
};

const getUsersAllSuccess = (data) => {
  return {
    type: GET_USER_ALL_SUCCESS,
    payload: data,
  };
};

const getUsersAllFailure = (error) => {
  return {
    type: GET_USER_ALL_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const getExpertiseTagsOneAction = (userID) => {
  return async (dispatch) => {
    dispatch(getExpertiseTagsOneRequest());
    await getExpertiseTagsOneWithAxios(userID)
      .then((response) => {
        dispatch(getExpertiseTagsOneSuccess(response));
      })
      .catch((error) => {
        dispatch(getExpertiseTagsOneFailure(error.message));
      });
  };
};

const getExpertiseTagsOneWithAxios = async (userID) => {
  var expertiseTags = [];

  await getExpertiseTagsOne(userID).then((response) => {
    expertiseTags.push(response);
  });

  return {
    expertiseTags,
  };
};

const getExpertiseTagsOne = (userID) => {
  return axios.get(endpoints.getExpertiseTags, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      TechnicianID: userID,
    },
  });
};

const getExpertiseTagsOneRequest = () => {
  return {
    type: GET_EXPERTISE_TAGS_REQUEST,
  };
};

const getExpertiseTagsOneSuccess = (data) => {
  return {
    type: GET_EXPERTISE_TAGS_SUCCESS,
    payload: data,
  };
};

const getExpertiseTagsOneFailure = (error) => {
  return {
    type: GET_EXPERTISE_TAGS_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const getTechniciansAssignAction = (userID) => {
  return async (dispatch) => {
    dispatch(getTechniciansAssignRequest());
    await getTechniciansAssignWithAxios(userID)
      .then((response) => {
        dispatch(getTechniciansAssignSuccess(response));
      })
      .catch((error) => {
        dispatch(getTechniciansAssignFailure(error.message));
      });
  };
};

const getTechniciansAssignWithAxios = async (userID) => {
  var technicianAssign = [];

  await getTechniciansAssign(userID).then((response) => {
    technicianAssign.push(response);
  });

  return {
    technicianAssign,
  };
};

const getTechniciansAssign = (userID) => {
  return axios.get(endpoints.getTechniciansAssign, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      UserID: userID,
    },
  });
};

const getTechniciansAssignRequest = () => {
  return {
    type: GET_TECHNICIANS_ASSIGN_REQUEST,
  };
};

const getTechniciansAssignSuccess = (data) => {
  return {
    type: GET_TECHNICIANS_ASSIGN_SUCCESS,
    payload: data,
  };
};

const getTechniciansAssignFailure = (error) => {
  return {
    type: GET_TECHNICIANS_ASSIGN_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const putTicketsAssignAction = (ticketID, technicianID, openDate) => {
  return async (dispatch) => {
    dispatch(putTicketsAssignRequest());
    await putTicketsAssignWithAxios(ticketID, technicianID, openDate)
      .then((response) => {
        dispatch(putTicketsAssignSuccess(response));
      })
      .catch((error) => {
        dispatch(putTicketsAssignFailure(error.message));
      });
  };
};

const putTicketsAssignWithAxios = async (ticketID, technicianID, openDate) => {
  var tickets = [];

  await putTicketsAssign(ticketID, technicianID, openDate).then((response) => {
    tickets.push(response);
  });

  return {
    tickets,
  };
};

const putTicketsAssign = (ticketID, technicianID, openDate) => {
  return axios.put(
    endpoints.assignTicket,
    { TicketID: ticketID, TechnicianID: technicianID, OpenDate: openDate },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const putTicketsAssignRequest = () => {
  return {
    type: PUT_TICKETS_ASSIGN_REQUEST,
  };
};

const putTicketsAssignSuccess = (data) => {
  return {
    type: PUT_TICKETS_ASSIGN_SUCCESS,
    payload: data,
  };
};

const putTicketsAssignFailure = (error) => {
  return {
    type: PUT_TICKETS_ASSIGN_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const putTicketPriorityAction = (ticketID, priority) => {
  return async (dispatch) => {
    dispatch(putTicketPriorityRequest());
    await putTicketPriorityWithAxios(ticketID, priority)
      .then((response) => {
        dispatch(putTicketPrioritySuccess(response));
      })
      .catch((error) => {
        dispatch(putTicketPriorityFailure(error.message));
      });
  };
};

const putTicketPriorityWithAxios = async (ticketID, priority) => {
  var tickets = [];

  await putTicketPriority(ticketID, priority).then((response) => {
    tickets.push(response);
  });

  return {
    tickets,
  };
};

const putTicketPriority = (ticketID, priority) => {
  return axios.put(
    endpoints.putTicketPriority,
    { TicketID: ticketID, Priority: priority },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const putTicketPriorityRequest = () => {
  return {
    type: PUT_TICKET_PRIORITY_REQUEST,
  };
};

const putTicketPrioritySuccess = (data) => {
  return {
    type: PUT_TICKET_PRIORITY_SUCCESS,
    payload: data,
  };
};

const putTicketPriorityFailure = (error) => {
  return {
    type: PUT_TICKET_PRIORITY_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const putTagsAction = (tagType, category, orgID) => {
  return async (dispatch) => {
    dispatch(putTagsRequest());
    await putTagsWithAxios(tagType, category, orgID)
      .then((response) => {
        dispatch(putTagsSuccess(response));
      })
      .catch((error) => {
        dispatch(putTagsFailure(error.message));
      });
  };
};

const putTagsWithAxios = async (tagType, category, orgID) => {
  var tags = [];

  await putTags(tagType, category, orgID).then((response) => {
    tags.push(response);
  });

  return {
    tags,
  };
};

const putTags = (tagType, category, orgID) => {
  return axios.put(
    endpoints.putTags,
    { TagType: tagType, Category: category, OrganizationID: orgID },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const putTagsRequest = () => {
  return {
    type: PUT_TAGS_REQUEST,
  };
};

const putTagsSuccess = (data) => {
  return {
    type: PUT_TAGS_SUCCESS,
    payload: data,
  };
};

const putTagsFailure = (error) => {
  return {
    type: PUT_TAGS_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const putTagCategoriesAction = (categoryID, bgColor, color) => {
  return async (dispatch) => {
    dispatch(putTagCategoriesRequest());
    await putTagCategoriesWithAxios(categoryID, bgColor, color)
      .then((response) => {
        dispatch(putTagCategoriesSuccess(response));
      })
      .catch((error) => {
        dispatch(putTagCategoriesFailure(error.message));
      });
  };
};

const putTagCategoriesWithAxios = async (categoryID, bgColor, color) => {
  var tagCategories = [];

  await putTagCategories(categoryID, bgColor, color).then((response) => {
    tagCategories.push(response);
  });

  return {
    tagCategories,
  };
};

const putTagCategories = (categoryID, bgColor, color) => {
  return axios.put(
    endpoints.putTagCategory,
    { CategoryID: categoryID, BackgroundColor: bgColor, Color: color },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const putTagCategoriesRequest = () => {
  return {
    type: PUT_TAG_CATEGORIES_REQUEST,
  };
};

const putTagCategoriesSuccess = (data) => {
  return {
    type: PUT_TAG_CATEGORIES_SUCCESS,
    payload: data,
  };
};

const putTagCategoriesFailure = (error) => {
  return {
    type: PUT_TAG_CATEGORIES_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const putTicketsAutoAssignAction = (
  ticketID,
  technicianID,
  openDate
) => {
  return async (dispatch) => {
    dispatch(putTicketsAutoAssignRequest());
    await putTicketsAutoAssignWithAxios(ticketID, technicianID, openDate)
      .then((response) => {
        dispatch(putTicketsAutoAssignSuccess(response));
      })
      .catch((error) => {
        dispatch(putTicketsAutoAssignFailure(error.message));
      });
  };
};

const putTicketsAutoAssignWithAxios = async (
  ticketID,
  technicianID,
  openDate
) => {
  var tickets = [];

  await putTicketsAutoAssign(ticketID, technicianID, openDate).then(
    (response) => {
      tickets.push(response);
    }
  );

  return {
    tickets,
  };
};

const putTicketsAutoAssign = (ticketID, caseNumber, openDate) => {
  return axios.put(
    endpoints.autoAssignTicket,
    { TicketID: ticketID, CaseNumber: caseNumber, OpenDate: openDate },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const putTicketsAutoAssignRequest = () => {
  return {
    type: PUT_TICKETS_AUTO_ASSIGN_REQUEST,
  };
};

const putTicketsAutoAssignSuccess = (data) => {
  return {
    type: PUT_TICKETS_AUTO_ASSIGN_SUCCESS,
    payload: data,
  };
};

const putTicketsAutoAssignFailure = (error) => {
  return {
    type: PUT_TICKETS_AUTO_ASSIGN_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const putPermissionsAction = (updatedRow, oldRow, organizationID) => {
  return async (dispatch) => {
    dispatch(putPermissionsRequest());
    await putPermissionsWithAxios(updatedRow, oldRow, organizationID)
      .then((response) => {
        dispatch(putPermissionsSuccess(response));
      })
      .catch((error) => {
        dispatch(putPermissionsFailure(error.message));
      });
  };
};

const putPermissionsWithAxios = async (updatedRow, oldRow, organizationID) => {
  var access = [];

  await putPermissions(updatedRow, oldRow, organizationID).then((response) => {
    access.push(response);
  });

  return {
    access,
  };
};

const putPermissions = (updatedRow, oldRow, organizationID) => {
  return axios.put(
    endpoints.permissionsUpdate,
    { updatedRow: updatedRow, organizationID: organizationID },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const putPermissionsRequest = () => {
  return {
    type: PUT_PERMISSIONS_REQUEST,
  };
};

const putPermissionsSuccess = (data) => {
  return {
    type: PUT_PERMISSIONS_SUCCESS,
    payload: data,
  };
};

const putPermissionsFailure = (error) => {
  return {
    type: PUT_PERMISSIONS_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const getAllTagsAction = (orgID) => {
  return async (dispatch) => {
    dispatch(getAllTagsRequest());
    await getAllTagsWithAxios(orgID)
      .then((response) => {
        dispatch(getAllTagsSuccess(response));
      })
      .catch((error) => {
        dispatch(getAllTagsFailure(error.message));
      });
  };
};

const getAllTagsWithAxios = async (orgID) => {
  var tags = [];

  await getAllTags(orgID).then((response) => {
    tags.push(response);
  });

  return {
    tags,
  };
};

const getAllTags = (orgID) => {
  return axios.get(endpoints.tagsAll, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      OrganizationID: orgID,
    },
  });
};

const getAllTagsRequest = () => {
  return {
    type: GET_ALL_TAGS_REQUEST,
  };
};

const getAllTagsSuccess = (data) => {
  return {
    type: GET_ALL_TAGS_SUCCESS,
    payload: data,
  };
};

const getAllTagsFailure = (error) => {
  return {
    type: GET_ALL_TAGS_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const getTagCategoriesAction = (orgID) => {
  return async (dispatch) => {
    dispatch(getTagCategoriesRequest());
    await getTagCategoriesWithAxios(orgID)
      .then((response) => {
        dispatch(getTagCategoriesSuccess(response));
      })
      .catch((error) => {
        dispatch(getTagCategoriesFailure(error.message));
      });
  };
};

const getTagCategoriesWithAxios = async (orgID) => {
  var tagCategories = [];

  await getTagCategories(orgID).then((response) => {
    tagCategories.push(response);
  });

  return {
    tagCategories,
  };
};

const getTagCategories = (orgID) => {
  return axios.get(endpoints.getTagCategories, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      OrganizationID: orgID,
    },
  });
};

const getTagCategoriesRequest = () => {
  return {
    type: GET_TAG_CATEGORIES_REQUEST,
  };
};

const getTagCategoriesSuccess = (data) => {
  return {
    type: GET_TAG_CATEGORIES_SUCCESS,
    payload: data,
  };
};

const getTagCategoriesFailure = (error) => {
  return {
    type: GET_TAG_CATEGORIES_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const postUserRegisterExistingOrganizationAction = (
  email,
  userName,
  password,
  firstName,
  lastName,
  companyName
) => {
  return async (dispatch) => {
    dispatch(postUserRegisterExistingOrganizationRequest());
    await postUserRegisterExistingOrganizationAxios(
      email,
      userName,
      password,
      firstName,
      lastName,
      companyName
    )
      .then((response) => {
        dispatch(postUserRegisterExistingOrganizationSuccess(response));
      })
      .catch((error) => {
        dispatch(postUserRegisterExistingOrganizationFailure(error.message));
      });
  };
};

const postUserRegisterExistingOrganizationAxios = async (
  email,
  userName,
  password,
  firstName,
  lastName,
  companyName
) => {
  var reponse = [];

  await postUserRegisterExistingOrganization(
    email,
    userName,
    password,
    firstName,
    lastName,
    companyName
  ).then((response) => {
    reponse.push(response);
  });

  return {
    reponse,
  };
};

const postUserRegisterExistingOrganization = (
  email,
  userName,
  password,
  firstName,
  lastName,
  companyName
) => {
  return axios.post(
    endpoints.registerUserExistingOrganization,
    {
      email: email,
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const postUserRegisterExistingOrganizationRequest = (error) => {
  return {
    type: POST_USER_REGISTER_EXISTING_ORGANIZAITON_REQUEST,
    payload: error,
  };
};

const postUserRegisterExistingOrganizationSuccess = (data) => {
  return {
    type: POST_USER_REGISTER_EXISTING_ORGANIZAITON_SUCCESS,
    payload: data,
  };
};

const postUserRegisterExistingOrganizationFailure = () => {
  return {
    type: POST_USER_REGISTER_EXISTING_ORGANIZAITON_FAILURE,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const postUserRegisterNewOrganizationAction = (
  email,
  userName,
  password,
  firstName,
  lastName,
  companyName
) => {
  return async (dispatch) => {
    dispatch(postUserRegisterNewOrganizationRequest());
    await postUserRegisterNewOrganizationAxios(
      email,
      userName,
      password,
      firstName,
      lastName,
      companyName
    )
      .then((response) => {
        dispatch(postUserRegisterNewOrganizationSuccess(response));
      })
      .catch((error) => {
        dispatch(postUserRegisterNewOrganizationFailure(error.message));
      });
  };
};

const postUserRegisterNewOrganizationAxios = async (
  email,
  userName,
  password,
  firstName,
  lastName,
  companyName
) => {
  var reponse = [];

  await postUserRegisterNewOrganization(
    email,
    userName,
    password,
    firstName,
    lastName,
    companyName
  ).then((response) => {
    reponse.push(response);
  });

  return {
    reponse,
  };
};

const postUserRegisterNewOrganization = (
  email,
  userName,
  password,
  firstName,
  lastName,
  companyName
) => {
  return axios.post(
    endpoints.registerUserNewOrganization,
    {
      email: email,
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const postUserRegisterNewOrganizationRequest = (error) => {
  return {
    type: POST_USER_REGISTER_NEW_ORGANIZAITON_REQUEST,
    payload: error,
  };
};

const postUserRegisterNewOrganizationSuccess = (data) => {
  return {
    type: POST_USER_REGISTER_NEW_ORGANIZAITON_SUCCESS,
    payload: data,
  };
};

const postUserRegisterNewOrganizationFailure = () => {
  return {
    type: POST_USER_REGISTER_NEW_ORGANIZAITON_FAILURE,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const postTicketNewTicketAction = (
  userID,
  subject,
  description,
  submissionDate,
  tags
) => {
  return async (dispatch) => {
    dispatch(postTicketNewTicketRequest());

    return new Promise(async (resolve, reject) => {
      await postTicketNewTicketWithAxios(
        userID,
        subject,
        description,
        submissionDate,
        tags
      )
        .then((response) => {
          dispatch(postTicketNewTicketSuccess(response));
          return resolve(response);
        })
        .catch((error) => {
          dispatch(postTicketNewTicketFailure(error.message));
          return reject(error);
        });
    });
  };
};

const postTicketNewTicketWithAxios = async (
  userID,
  subject,
  description,
  submissionDate,
  tags
) => {
  var reponse = [];

  await postTicketNewTicket(
    userID,
    subject,
    description,
    submissionDate,
    tags
  ).then((response) => {
    reponse.push(response);
  });

  return {
    reponse,
  };
};

const postTicketNewTicket = (
  userID,
  subject,
  description,
  submissionDate,
  tags
) => {
  return axios.post(
    endpoints.newTicket,
    {
      UserID: userID,
      Subject: subject,
      Description: description,
      SubmissionDate: submissionDate,
      Tags: tags,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const postTicketNewTicketRequest = (error) => {
  return {
    type: POST_TICKETS_NEW_TICKET_REQUEST,
    payload: error,
  };
};

const postTicketNewTicketSuccess = (data) => {
  return {
    type: POST_TICKETS_NEW_TICKET_SUCCESS,
    payload: data,
  };
};

const postTicketNewTicketFailure = () => {
  return {
    type: POST_TICKETS_NEW_TICKET_FAILURE,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const postExpertiseTagsAction = (userID, tags) => {
  return async (dispatch) => {
    dispatch(postExpertiseTagsRequest());
    await postExpertiseTagsWithAxios(userID, tags)
      .then((response) => {
        dispatch(postExpertiseTagsSuccess(response));
      })
      .catch((error) => {
        dispatch(postExpertiseTagsFailure(error.message));
      });
  };
};

const postExpertiseTagsWithAxios = async (userID, tags) => {
  var expertiseTags = [];

  await postExpertiseTags(userID, tags).then((response) => {
    expertiseTags.push(response);
  });

  return {
    expertiseTags,
  };
};

const postExpertiseTags = (userID, tags) => {
  return axios.post(
    endpoints.expertiseTags,
    {
      UserID: userID,
      Tags: tags,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const postExpertiseTagsRequest = (error) => {
  return {
    type: POST_EXPERTISE_TAGS_REQUEST,
    payload: error,
  };
};

const postExpertiseTagsSuccess = (data) => {
  return {
    type: POST_EXPERTISE_TAGS_SUCCESS,
    payload: data,
  };
};

const postExpertiseTagsFailure = () => {
  return {
    type: POST_EXPERTISE_TAGS_FAILURE,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const postTagsAction = (tagType, categoryID, orgID) => {
  return async (dispatch) => {
    dispatch(postTagsRequest());
    await postTagsWithAxios(tagType, categoryID, orgID)
      .then((response) => {
        dispatch(postTagsSuccess(response));
      })
      .catch((error) => {
        dispatch(postTagsFailure(error.message));
      });
  };
};

const postTagsWithAxios = async (tagType, categoryID, orgID) => {
  var tags = [];

  await postTags(tagType, categoryID, orgID).then((response) => {
    tags.push(response);
  });

  return {
    tags,
  };
};

const postTags = (tagType, categoryID, orgID) => {
  return axios.post(
    endpoints.postTags,
    {
      TagType: tagType,
      CategoryID: categoryID,
      OrganizationID: orgID,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const postTagsRequest = (error) => {
  return {
    type: POST_TAGS_REQUEST,
    payload: error,
  };
};

const postTagsSuccess = (data) => {
  return {
    type: POST_TAGS_SUCCESS,
    payload: data,
  };
};

const postTagsFailure = () => {
  return {
    type: POST_TAGS_FAILURE,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const postTagCategoryAction = (
  category,
  backgroundColor,
  color,
  orgID
) => {
  return async (dispatch) => {
    dispatch(postTagCategoryRequest());
    await postTagCategoryWithAxios(category, backgroundColor, color, orgID)
      .then((response) => {
        dispatch(postTagCategorySuccess(response));
      })
      .catch((error) => {
        dispatch(postTagCategoryFailure(error.message));
      });
  };
};

const postTagCategoryWithAxios = async (
  category,
  backgroundColor,
  color,
  orgID
) => {
  var tagCategories = [];

  await postTagCategory(category, backgroundColor, color, orgID).then(
    (response) => {
      tagCategories.push(response);
    }
  );

  return {
    tagCategories,
  };
};

const postTagCategory = (category, backgroundColor, color, orgID) => {
  return axios.post(
    endpoints.postTagCategory,
    {
      Category: category,
      OrganizationID: orgID,
      BackgroundColor: backgroundColor,
      Color: color,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const postTagCategoryRequest = (error) => {
  return {
    type: POST_TAG_CATEGORY_REQUEST,
    payload: error,
  };
};

const postTagCategorySuccess = (data) => {
  return {
    type: POST_TAG_CATEGORY_SUCCESS,
    payload: data,
  };
};

const postTagCategoryFailure = () => {
  return {
    type: POST_TAG_CATEGORY_FAILURE,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const deleteTagAction = (tagType, orgID) => {
  return async (dispatch) => {
    dispatch(deleteTagRequest());
    await deleteTagWithAxios(tagType, orgID)
      .then((response) => {
        dispatch(deleteTagSuccess(response));
      })
      .catch((error) => {
        dispatch(deleteTagFailure(error.message));
      });
  };
};

const deleteTagWithAxios = async (tagType, orgID) => {
  var tags = [];

  await deleteTag(tagType, orgID).then((response) => {
    tags.push(response);
  });

  return {
    tags,
  };
};

const deleteTag = (tagType, orgID) => {
  return axios.delete(endpoints.deleteTag, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      TagType: tagType,
      OrganizationID: orgID,
    },
  });
};

const deleteTagRequest = (error) => {
  return {
    type: DELETE_TAG_REQUEST,
    payload: error,
  };
};

const deleteTagSuccess = (data) => {
  return {
    type: DELETE_TAG_SUCCESS,
    payload: data,
  };
};

const deleteTagFailure = (error) => {
  return {
    type: DELETE_TAG_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const logoutUserAction = () => {
  return async (dispatch) => {
    dispatch(logoutUser());
  };
};

const logoutUser = () => {
  return {
    type: USER_LOGOUT,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const putTblUsersApprovedAction = (UserID, status, organizationID) => {
  return async (dispatch) => {
    dispatch(putTblUsersApprovedRequest());
    await putTblUsersApprovedWithAxios(UserID, status, organizationID)
      .then((response) => {
        dispatch(putTblUsersApprovedSuccess(response));
      })
      .catch((error) => {
        dispatch(putTblUsersApprovedFailure(error.message));
      });
  };
};

const putTblUsersApprovedWithAxios = async (UserID, status, organizationID) => {
  var users = [];

  await putTblUsersApproved(UserID, status, organizationID).then((response) => {
    users.push(response);
  });

  return {
    users,
  };
};

const putTblUsersApproved = (UserID, status, organizationID) => {
  return axios.put(
    endpoints.approved,
    { UserID: UserID, status: status, organizationID: organizationID },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const putTblUsersApprovedRequest = () => {
  return {
    type: PUT_USER_APPROVED_REQUEST,
  };
};

const putTblUsersApprovedSuccess = (data) => {
  return {
    type: PUT_USER_APPROVED_SUCCESS,
    payload: data,
  };
};

const putTblUsersApprovedFailure = (error) => {
  return {
    type: PUT_USER_APPROVED_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const notificationsAction = (notifications) => {
  return async (dispatch) => {
    dispatch(notificatonsSuccess(notifications));
  };
};

const notificatonsSuccess = (data) => {
  return {
    type: NOTIFICATIONS_SUCCESS,
    payload: data,
  };
};

/**************************************************************************************************************/

/**************************************************************************************************************/
export const notificationClearAction = () => {
  return async (dispatch) => {
    dispatch(notificationCLear());
  };
};

const notificationCLear = () => {
  return {
    type: NOTIFICATION_CLEAR,
  };
};

/**************************************************************************************************************/
