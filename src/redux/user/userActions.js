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
  GET_TICKETS_REQUEST,
  GET_TICKETS_SUCCESS,
  GET_TICKETS_FAILURE,
  PUT_TICKETS_SELF_ASSIGN_REQUEST,
  PUT_TICKETS_SELF_ASSIGN_SUCCESS,
  PUT_TICKETS_SELF_ASSIGN_FAILURE,
  GET_USER_ALL_FAILURE,
  GET_USER_ALL_SUCCESS,
  GET_USER_ALL_REQUEST,
  GET_PERMISSIONS_ALL_REQUEST,
  GET_PERMISSIONS_ALL_SUCCESS,
  GET_PERMISSIONS_ALL_FAILURE,
  PUT_PERMISSIONS_REQUEST,
  PUT_PERMISSIONS_SUCCESS,
  PUT_PERMISSIONS_FAILURE,
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
  console.log(username);
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
export const getUserSessionAction = (username, password) => {
  return async (dispatch) => {
    dispatch(getUserSessionRequest());
    await getUserSessionWithAxios(username, password)
      .then((response) => {
        dispatch(getUserSessionSuccess(response));
      })
      .catch((error) => {
        dispatch(getUserSessionFailure(error.message));
      });
  };
};

const getUserSessionWithAxios = async (username, password) => {
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

const getUserSession = (username, password) => {
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
export const getPermissionsAllAction = () => {
  return async (dispatch) => {
    dispatch(getPermissionsAllRequest());
    await getPermissionsAllWithAxios()
      .then((response) => {
        dispatch(getPermissionsAllSuccess(response));
      })
      .catch((error) => {
        dispatch(getPermissionsAllFailure(error.message));
      });
  };
};

const getPermissionsAllWithAxios = async () => {
  var roles = [];

  // await postUserLogin().then((response) => {
  //   user.push(response);
  // });

  await getPermissionsAll().then((response) => {
    roles.push(response);
  });

  return {
    roles,
  };
};

const getPermissionsAll = () => {
  return axios.get(endpoints.rolesAll, {
    headers: {
      "Content-Type": "application/json",
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
    await getTicketsWithAxios(organizationID)
      .then((response) => {
        dispatch(getTicketsSuccess(response));
      })
      .catch((error) => {
        dispatch(getTicketsFailure(error.message));
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
export const getUsersAllAction = () => {
  return async (dispatch) => {
    dispatch(getUsersAllRequest());
    await getUsersAllWithAxios()
      .then((response) => {
        dispatch(getUsersAllSuccess(response));
      })
      .catch((error) => {
        dispatch(getUsersAllFailure(error.message));
      });
  };
};

const getUsersAllWithAxios = async () => {
  var users = [];

  await getUsersAll().then((response) => {
    users.push(response);
  });

  return {
    users,
  };
};

const getUsersAll = () => {
  return axios.get(endpoints.usersAll, {
    headers: {
      "Content-Type": "application/json",
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
export const putTicketsSelfAssignAction = (
  ticketID,
  technicianID,
  openDate
) => {
  return async (dispatch) => {
    dispatch(putTicketsSelfAssignRequest());
    await putTicketsSelfAssignWithAxios(ticketID, technicianID, openDate)
      .then((response) => {
        dispatch(putTicketsSelfAssignSuccess(response));
      })
      .catch((error) => {
        dispatch(putTicketsSelfAssignFailure(error.message));
      });
  };
};

const putTicketsSelfAssignWithAxios = async (
  ticketID,
  technicianID,
  openDate
) => {
  var tickets = [];

  await putTicketsSelfAssign(ticketID, technicianID, openDate).then(
    (response) => {
      tickets.push(response);
    }
  );

  return {
    tickets,
  };
};

const putTicketsSelfAssign = (ticketID, technicianID, openDate) => {
  return axios.put(
    endpoints.selfAssignTicket,
    { TicketID: ticketID, TechnicianID: technicianID, OpenDate: openDate },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const putTicketsSelfAssignRequest = () => {
  return {
    type: PUT_TICKETS_SELF_ASSIGN_REQUEST,
  };
};

const putTicketsSelfAssignSuccess = (data) => {
  return {
    type: PUT_TICKETS_SELF_ASSIGN_SUCCESS,
    payload: data,
  };
};

const putTicketsSelfAssignFailure = (error) => {
  return {
    type: PUT_TICKETS_SELF_ASSIGN_FAILURE,
    payload: error,
  };
};
/**************************************************************************************************************/

/**************************************************************************************************************/
export const putPermissionsAction = (updatedRow, oldRow) => {
  return async (dispatch) => {
    dispatch(putPermissionsRequest());
    await putPermissionsWithAxios(updatedRow, oldRow)
      .then((response) => {
        dispatch(putPermissionsSuccess(response));
      })
      .catch((error) => {
        dispatch(putPermissionsFailure(error.message));
      });
  };
};

const putPermissionsWithAxios = async (updatedRow, oldRow) => {
  var access = [];

  await putPermissions(updatedRow, oldRow).then((response) => {
    access.push(response);
  });

  return {
    access,
  };
};

const putPermissions = (updatedRow, oldRow) => {
  return axios.put(
    endpoints.permissionsUpdate,
    { updatedRow: updatedRow },
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
export const getAllTagsAction = () => {
  return async (dispatch) => {
    dispatch(getAllTagsRequest());
    await getAllTagsWithAxios()
      .then((response) => {
        dispatch(getAllTagsSuccess(response));
      })
      .catch((error) => {
        dispatch(getAllTagsFailure(error.message));
      });
  };
};

const getAllTagsWithAxios = async () => {
  var tags = [];

  await getAllTags().then((response) => {
    tags.push(response);
  });

  return {
    tags,
  };
};

const getAllTags = () => {
  return axios.get(endpoints.tagsAll, {
    headers: {
      "Content-Type": "application/json",
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
  console.log(companyName);
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
    await postTicketNewTicketWithAxios(
      userID,
      subject,
      description,
      submissionDate,
      tags
    )
      .then((response) => {
        dispatch(postTicketNewTicketSuccess(response));
      })
      .catch((error) => {
        dispatch(postTicketNewTicketFailure(error.message));
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
