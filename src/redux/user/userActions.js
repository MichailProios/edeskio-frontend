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
