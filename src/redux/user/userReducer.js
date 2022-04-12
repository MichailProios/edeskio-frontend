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
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
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
  PUT_TICKETS_SELF_ASSIGN_REQUEST,
  PUT_TICKETS_SELF_ASSIGN_SUCCESS,
  PUT_TICKETS_SELF_ASSIGN_FAILURE,
  GET_USER_ALL_REQUEST,
  GET_USER_ALL_SUCCESS,
  GET_USER_ALL_FAILURE,
  GET_PERMISSIONS_ALL_REQUEST,
  GET_PERMISSIONS_ALL_SUCCESS,
  GET_PERMISSIONS_ALL_FAILURE,
  PUT_PERMISSIONS_REQUEST,
  PUT_PERMISSIONS_SUCCESS,
  PUT_PERMISSIONS_FAILURE,
  USER_LOGOUT,
} from "./userTypes";
import { store } from "../store";

// import { msalInstance } from "../../index.js";
// import moment from "moment";
// import formatCalendar from "../../utilities/customFunctions/formatCalendar";

export const initialState = {
  //General
  loading: false,
  successfull: false,
  error: "",

  //Login
  loginLoading: false,
  authenticated: false,

  //User
  userLoading: false,
  sessionUser: "",
  user: {
    tblAccess: {},
    tblOrganization: {},
    tblUser: {},
  },

  //Tags
  tags: {
    tblTags: [
      {
        Type: null,
        Category: null,
      },
    ],
  },

  //Permissions
  roles: [],
  users: { tblUsers: [{}] },
  access: [],

  //Tickets
  tickets: { tblTickets: [{ ID: null, Subject: "" }] },

  //Organization
  organizations: [],
};

export const UserReducer = (state = initialState, action) => {
  let roles;
  let access;
  let users;

  switch (action.type) {
    case POST_USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loginLoading: true,
        successfull: false,
      };
    case POST_USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loading: false,
        successfull: true,
        sessionUser: action.payload.user[0].data.session.passport.user,
        authenticated: action.payload.user[0].data.isAuthenticated,
      };
    case POST_USER_LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loading: false,
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

    case GET_USER_REQUEST:
      return {
        ...state,
        userLoading: true,
        loading: true,
        successfull: false,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user[0].data,
        userLoading: false,
        loading: false,
        successfull: true,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        userLoading: false,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case GET_ALL_TAGS_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case GET_ALL_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.payload.tags[0].data,
        loading: false,
        successfull: true,
      };
    case GET_ALL_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case POST_TICKETS_NEW_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case POST_TICKETS_NEW_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        successfull: true,
      };
    case POST_TICKETS_NEW_TICKET_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case POST_EXPERTISE_TAGS_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case POST_EXPERTISE_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        successfull: true,
      };
    case POST_EXPERTISE_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case GET_TICKETS_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case GET_TICKETS_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: action.payload.tickets[0].data,
        successfull: true,
      };
    case GET_TICKETS_FAILURE:
      return {
        ...state,
        successfull: false,
        error: action.payload,
      };

    case GET_EXPERTISE_TAGS_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case GET_EXPERTISE_TAGS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        //expertiseTags: action.payload.tags[0].data,
        successfull: true,
      };
    case GET_EXPERTISE_TAGS_FAILURE:
      return {
        ...state,
        successfull: false,
        error: action.payload,
      };

    case PUT_TICKETS_SELF_ASSIGN_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case PUT_TICKETS_SELF_ASSIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: action.payload.tickets[0].data,
        successfull: true,
      };
    case PUT_TICKETS_SELF_ASSIGN_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case GET_USER_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case GET_USER_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users[0].data,
        successfull: true,
      };
    case GET_USER_ALL_FAILURE:
      return {
        ...state,
        successfull: false,
        error: action.payload,
      };

    case GET_PERMISSIONS_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case GET_PERMISSIONS_ALL_SUCCESS:
      access = action.payload.roles[0].data.tblAccess;
      roles = action.payload.roles[0].data.tblRoles;
      users = action.payload.roles[0].data.tblUsers;

      console.log(access);

      access = access.map((record) => {
        let user = users.find((userRecord) => userRecord.ID === record.UserID);

        let role = roles.find(
          (roleRecord) => roleRecord.Name === record.RoleName
        );

        // const roleName = (roleID) => {
        //   switch (roleID) {
        //     case 1:
        //       return "Entry";
        //     case 2:
        //       return "Basic";
        //     case 3:
        //       return "Admin";
        //     case 4:
        //       return "Super Admin";
        //     default:
        //       return "";
        //   }
        // };

        record.FirstName = user.FirstName;
        record.LastName = user.LastName;
        // record.Module = typeof module === "undefined" ? "None" : module.Name;
        // record.Role = roleName(role.ID);

        return record;
      });

      return {
        ...state,
        loading: false,
        roles: action.payload.roles[0].data.tblRoles,
        access: access,
        successfull: true,
      };
    case GET_PERMISSIONS_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case PUT_PERMISSIONS_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case PUT_PERMISSIONS_SUCCESS:
      access = action.payload.access[0].data.tblAccess;
      roles = action.payload.access[0].data.tblRoles;
      users = action.payload.access[0].data.tblUsers;

      access = access.map((record) => {
        let user = users.find((userRecord) => userRecord.ID === record.UserID);

        let role = roles.find(
          (roleRecord) => roleRecord.Name === record.RoleName
        );

        // const roleName = (roleID) => {
        //   switch (roleID) {
        //     case 1:
        //       return "Entry";
        //     case 2:
        //       return "Basic";
        //     case 3:
        //       return "Admin";
        //     case 4:
        //       return "Super Admin";
        //     default:
        //       return "";
        //   }
        // };

        record.FirstName = user.FirstName;
        record.LastName = user.LastName;
        // record.Module = typeof module === "undefined" ? "None" : module.Name;
        // record.Role = roleName(role.ID);

        return record;
      });

      return {
        ...state,
        loading: false,
        access: access,
        successfull: true,
      };
    case PUT_PERMISSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        authenticated: false,
        sessionUser: "",
        // users: { tblUsers: [{}] },
        // tickets: { tblTickets: [{}] },
        // tags: {
        //   tblTags: [
        //     {
        //       Type: null,
        //       Category: null,
        //     },
        //   ],
        // },
      };

    default:
      return state;
  }
};

export default UserReducer;
