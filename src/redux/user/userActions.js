import axios from "axios";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_CALENDAR_REQUEST,
  FETCH_USER_CALENDAR_SUCCESS,
  FETCH_USER_CALENDAR_FAILURE,
  FETCH_USER_API_TOKEN_REQUEST,
  FETCH_USER_API_TOKEN_SUCCESS,
  FETCH_USER_API_TOKEN_FAILURE,
  FETCH_USER_GRAPH_TOKEN_REQUEST,
  FETCH_USER_GRAPH_TOKEN_SUCCESS,
  FETCH_USER_GRAPH_TOKEN_FAILURE,
} from "./userTypes";

import { store } from "../store";

import { getGraphApiToken } from "../../utilities/azure/MsGraphApiCall";

import { getMaximApiToken } from "../../utilities/azure/MaximApiCall";

import { endpoints } from "./userEndpoints";

export const getUser = () => {
  return async (dispatch) => {
    dispatch(getGraphTokenRequest());

    await getGraphApiToken()
      .then((response) => {
        dispatch(getGraphTokenSuccess(response.accessToken));
      })
      .catch((error) => {
        dispatch(getGraphTokenFailure(error.message));
      });

    dispatch(getApiTokenRequest());

    await getMaximApiToken()
      .then((response) => {
        dispatch(getApiTokenSuccess(response.accessToken));
      })
      .catch((error) => {
        dispatch(getApiTokenFailure(error.message));
      });

    dispatch(getUserRequest());

    await getUserWithAxios()
      .then((response) => {
        dispatch(getUserSuccess(response));
      })
      .catch((error) => {
        dispatch(getUserFailure(error.message));
      });

    dispatch(getUserCalendarRequest());
    await getUserCalendarWithAxios()
      .then((response) => {
        dispatch(getUserCalendarSuccess(response));
      })
      .catch((error) => {
        dispatch(getUserCalendarFailure(error.message));
      });
  };
};

const getUserCalendarWithAxios = async () => {
  let calendar = [];

  await getCalendarData().then((response) => {
    calendar.push(response);
  });

  return calendar;
};

const getUserWithAxios = async () => {
  var user = [];
  var modules = [];
  var options = [];
  var empData = [];
  var supervisor = [];
  var salesAsst = [];
  var chysql1EmpData = [];

  await getUserInfoData().then((response) => {
    user.push(response);
  });
  await getModulesData().then((response) => {
    modules.push(response);
  });
  await getOptionsData().then((response) => {
    options.push(response);
  });

  await getEmpData(user[0].data.mail.toLowerCase()).then((response) => {
    empData.push(response);
  });

  await getSupervisorData(empData[0].data.tblEmpData[0].SupervisorCrd).then(
    (response) => {
      supervisor.push(response);
    }
  );

  await getSalesAsstData(empData[0].data.tblEmpData[0].SlsAssist).then(
    (response) => {
      salesAsst.push(response);
    }
  );

  await getCHYSQL1EmpData(user[0].data.mail.toLowerCase()).then((response) => {
    chysql1EmpData.push(response);
  });

  return {
    modules,
    options,
    user,
    empData,
    supervisor,
    salesAsst,
    chysql1EmpData,
  };
};

function getSupervisorData(supervisorCrd) {
  return axios.get(endpoints.employeeByCRD, {
    headers: {
      Authorization: "Bearer " + getApiTokenState(),
      "Content-Type": "application/json",
    },
    params: {
      crd: supervisorCrd,
    },
  });
}

function getEmpData(userEmail) {
  return axios.get(endpoints.employeeByEmail, {
    headers: {
      Authorization: "Bearer " + getApiTokenState(),
      "Content-Type": "application/json",
    },
    params: {
      email: userEmail,
    },
  });
}

function getCHYSQL1EmpData(email) {
  return axios.get(endpoints.chysql1EmpData, {
    headers: {
      Authorization: "Bearer " + getApiTokenState(),
      "Content-Type": "application/json",
    },
    params: {
      email: email,
    },
  });
}
function getSalesAsstData(salesAsstCrd) {
  return axios.get(endpoints.employeeByCRD, {
    headers: {
      Authorization: "Bearer " + getApiTokenState(),
      "Content-Type": "application/json",
    },
    params: {
      crd: salesAsstCrd,
    },
  });
}
function getCalendarData() {
  return axios.get(endpoints.calendar, {
    headers: {
      Authorization: "Bearer " + getGraphTokenState(),
    },
  });
}

function getUserInfoData() {
  return axios.get(endpoints.userInfo, {
    headers: {
      Authorization: "Bearer " + getGraphTokenState(),
    },
  });
}

function getModulesData() {
  return axios.get(endpoints.modules, {
    headers: {
      Authorization: "Bearer " + getApiTokenState(),
    },
  });
}

function getOptionsData() {
  return axios.get(endpoints.options, {
    headers: {
      Authorization: "Bearer " + getApiTokenState(),
    },
  });
}

const getUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const getUserSuccess = (data) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data,
  };
};

const getUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

const getUserCalendarRequest = () => {
  return {
    type: FETCH_USER_CALENDAR_REQUEST,
  };
};

const getUserCalendarSuccess = (data) => {
  return {
    type: FETCH_USER_CALENDAR_SUCCESS,
    payload: data,
  };
};

const getUserCalendarFailure = (error) => {
  return {
    type: FETCH_USER_CALENDAR_FAILURE,
    payload: error,
  };
};

const getGraphTokenRequest = () => {
  return {
    type: FETCH_USER_GRAPH_TOKEN_REQUEST,
  };
};

const getGraphTokenSuccess = (token) => {
  return {
    type: FETCH_USER_GRAPH_TOKEN_SUCCESS,
    payload: token,
  };
};

const getGraphTokenFailure = (error) => {
  return {
    type: FETCH_USER_GRAPH_TOKEN_FAILURE,
    payload: error,
  };
};

const getApiTokenRequest = () => {
  return {
    type: FETCH_USER_API_TOKEN_REQUEST,
  };
};

const getApiTokenSuccess = (token) => {
  return {
    type: FETCH_USER_API_TOKEN_SUCCESS,
    payload: token,
  };
};

const getApiTokenFailure = (error) => {
  return {
    type: FETCH_USER_API_TOKEN_FAILURE,
    payload: error,
  };
};

function getGraphTokenState() {
  let state = store.getState();
  return state.User.graphToken;
}

function getApiTokenState() {
  let state = store.getState();
  return state.User.apiToken;
}
