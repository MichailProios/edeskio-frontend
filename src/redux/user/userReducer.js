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

// import { msalInstance } from "../../index.js";
// import moment from "moment";
// import formatCalendar from "../../utilities/customFunctions/formatCalendar";

export const initialState = {
  loading: false,
  loginLoading: false,
  successfull: false,
  authenticated: false,
  organizations: [],
  sessionUser: {},
  error: "",
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_USER_LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        successfull: false,
      };
    case POST_USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        successfull: true,
        sessionUser: action.payload.user[0].data.session.passport.user,
        authenticated: action.payload.user[0].data.isAuthenticated,
      };
    case POST_USER_LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        successfull: false,
        error: action.payload,
      };

    case GET_USER_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case GET_USER_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        successfull: true,
        sessionUser: action.payload.session[0].data.session.passport.user,
        authenticated: action.payload.session[0].data.isAuthenticated,
      };
    case GET_USER_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case GET_USER_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case GET_USER_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        organizations: action.payload.organizations[0].data.tblOrganizations,
        successfull: true,
      };
    case GET_USER_ORGANIZATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case POST_USER_REGISTER_EXISTING_ORGANIZAITON_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case POST_USER_REGISTER_EXISTING_ORGANIZAITON_SUCCESS:
      return {
        ...state,
        loading: false,
        successfull: true,
      };
    case POST_USER_REGISTER_EXISTING_ORGANIZAITON_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case POST_USER_REGISTER_NEW_ORGANIZAITON_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case POST_USER_REGISTER_NEW_ORGANIZAITON_SUCCESS:
      return {
        ...state,
        loading: false,
        successfull: true,
      };
    case POST_USER_REGISTER_NEW_ORGANIZAITON_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
