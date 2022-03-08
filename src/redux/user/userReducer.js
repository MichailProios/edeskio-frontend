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
  
  // import { msalInstance } from "../../index.js";
  import moment from "moment";
  import formatCalendar from "../../utilities/customFunctions/formatCalendar";
  
  export const initialState = {
    loading: false,
    successfull: false,
    user: [],
    email: "",
    userName: "",
    fullName: "",
    calendar: [],
    modules: [],
    options: [],
    apiToken: "",
    graphToken: "",
    error: "",
  
    CRDnum: "",
    supervisorEmail: "",
  
    empData: [],
    supervisor: [],
    salesAsst: [],
    chysql1EmpData: [],
    supervisorName: "",
    supervisorCrd: "",
    // crdNum: "",
    // isRep: "",
    // branch: "",
    // category: "",
    // supervisorCRD: "",
    // supervisorName: "",
    // salesAssistCRD: "",
    // salesAssistName: "",
    // regStates: "",
  };
  
  export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_REQUEST:
        return {
          ...state,
          loading: true,
          successfull: false,
          apiToken: state.apiToken,
          graphToken: state.graphToken,
          userName: state.userName,
          email: state.email,
        };
      case FETCH_USER_SUCCESS:
        let tblModules = action.payload.modules[0].data.Modules;
  
        let modules = tblModules.sort(function (a, b) {
          var textA = a.Name.toLowerCase();
          var textB = b.Name.toLowerCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
  
        if (
          window.location.hostname === "maximportal.com" ||
          window.location.hostname === "www.maximportal.com"
        ) {
          modules = modules.filter((row) => row.Active);
        } else if (window.location.hostname === "dev.maximportal.com") {
          modules = modules.filter((row) => row.Active || !row.Active);
        } else if (
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1" ||
          window.location.hostname === ""
        ) {
          modules = modules.filter((row) => row.Active || !row.Active);
        } else {
          modules = modules.filter((row) => row.Active || !row.Active);
        }
  
        return {
          ...state,
          loading: false,
          successfull: true,
          user: action.payload.user[0].data,
          CRDnum: action.payload.empData[0].data.tblEmpData[0].CRDnum,
          email: action.payload.user[0].data.mail.toLowerCase(),
          supervisorEmail:
            action.payload.supervisor[0].data.tblEmpData[0].EmailAddress,
          userName: action.payload.user[0].data.mail.split("@")[0].toLowerCase(),
          fullName: action.payload.user[0].data.displayName,
  
          modules: modules,
          options: action.payload.options[0].data.Options,
          empData: action.payload.empData[0].data.tblEmpData,
          chysql1EmpData: action.payload.chysql1EmpData[0].data.tblEmpData,
          supervisor: action.payload.supervisor[0].data.tblEmpData.EmpFirst,
          supervisorName:
            action.payload.supervisor[0].data.tblEmpData[0].EmpFirst +
            " " +
            action.payload.supervisor[0].data.tblEmpData[0].EmpLast,
          supervisorCrd: action.payload.supervisor[0].data.tblEmpData[0].CRDnum,
          salesAsst: action.payload.salesAsst[0].data.tblEmpData,
          apiToken: state.apiToken,
          graphToken: state.graphToken,
        };
      case FETCH_USER_FAILURE:
        return {
          ...state,
          loading: false,
          successfull: false,
          error: action.payload,
          userName: state.userName,
        };
      case FETCH_USER_CALENDAR_REQUEST:
        return {
          ...state,
          loading: true,
          successfull: false,
          apiToken: state.apiToken,
          graphToken: state.graphToken,
          userName: state.userName,
          email: state.email,
          calendar: state.calendar,
        };
      case FETCH_USER_CALENDAR_SUCCESS:
        return {
          ...state,
          loading: false,
          successful: true,
          calendar: formatCalendar(action.payload[0].data.value),
        };
      case FETCH_USER_CALENDAR_FAILURE:
        return {
          ...state,
          loading: false,
          successfull: false,
          error: action.payload,
          userName: state.userName,
          calendar: state.calendar,
        };
  
      case FETCH_USER_GRAPH_TOKEN_REQUEST:
        return {
          ...state,
          apiToken: state.apiToken,
          graphToken: state.graphToken,
          loading: true,
          successfull: false,
          userName: state.userName,
        };
      case FETCH_USER_GRAPH_TOKEN_SUCCESS:
        return {
          ...state,
          loading: false,
          successfull: true,
          graphToken: action.payload,
          apiToken: state.apiToken,
          userName: state.userName,
        };
      case FETCH_USER_GRAPH_TOKEN_FAILURE:
        return {
          ...state,
          loading: false,
          successfull: false,
          error: action.payload,
          userName: state.userName,
        };
      case FETCH_USER_API_TOKEN_REQUEST:
        return {
          ...state,
          loading: true,
          successfull: false,
          apiToken: state.apiToken,
          graphToken: state.graphToken,
          userName: state.userName,
        };
      case FETCH_USER_API_TOKEN_SUCCESS:
        return {
          ...state,
          loading: false,
          successfull: true,
          apiToken: action.payload,
          graphToken: state.graphToken,
          userName: state.userName,
        };
      case FETCH_USER_API_TOKEN_FAILURE:
        return {
          ...state,
          loading: false,
          successfull: false,
          error: action.payload,
          userName: state.userName,
        };
      default:
        return state;
    }
  };
  
  export const userIsLoadingSelector = (state) => {
    return state.User.loading;
  };
  
  export const userModules = (state) => {
    let data = state.User.calendar;
    let eventsList = [];
  
    if (data != null) {
      data.map(function (item) {
        return eventsList.push({
          start: new Date(moment.utc(item.start.dateTime).local().format()),
          end: new Date(moment.utc(item.end.dateTime).local().format()),
          title:
            item.subject === "" ? item.organizer.emailAddress.name : item.subject,
          allDay: item.isAllDay,
        });
      });
    }
  
    return eventsList;
  };
  
  export const userOptions = (state) => {
    let data = state.User.options;
  
    if (data != null) {
      data = data.filter((element) => element.Email === state.User.email);
      return data;
    } else {
      return [];
    }
  };
  
  export const userInfo = (state) => {
    let data = state.User.user;
  
    if (data != null) {
      return data;
    } else {
      return [];
    }
  };
  
  export const isGeneralLoading = () => {
    let state = store.getState();
  
    if (
      state.RegBI.loading ||
      state.User.loading ||
      state.Permissions.loading ||
      state.MRAND.loading ||
      state.RegBINewCustomer.loading ||
      state.DOL.loading ||
      state.CommissionChecker.loading ||
      state.MVACS.loading ||
      state.ComplianceCPReview.loading
    ) {
      return true;
    } else {
      return false;
    }
  };
  
  export default UserReducer;
  