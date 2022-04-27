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
  PUT_TICKETS_ASSIGN_REQUEST,
  PUT_TICKETS_ASSIGN_SUCCESS,
  PUT_TICKETS_ASSIGN_FAILURE,
  PUT_TICKETS_AUTO_ASSIGN_REQUEST,
  PUT_TICKETS_AUTO_ASSIGN_SUCCESS,
  PUT_TICKETS_AUTO_ASSIGN_FAILURE,
  GET_USER_ALL_REQUEST,
  GET_USER_ALL_SUCCESS,
  GET_USER_ALL_FAILURE,
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
  GET_TAG_CATEGORIES_FAILURE,
  NOTIFICATIONS_SUCCESS,
  NOTIFICATION_CLEAR,
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
    tblUser: { ID: null },
  },

  //Expertise Tags
  expertiseTagsLoading: false,
  expertiseTags: [],

  //Tags
  tags: [],

  tagCategories: [],

  //Permissions
  roles: [],
  users: [],
  access: [],
  usersApproved: [],

  //Tickets
  tickets: { tblTickets: [] },
  ticketTags: [],

  //Organization
  organizations: [],

  //TechAssign
  techs: [],
  expertiseTags_All: [],
  techsTicketCount: [],

  //Notifications
  notification: "",
  notifications: [],
};

export const UserReducer = (state = initialState, action) => {
  let roles;
  let access;
  let users;
  let expertiseTags;
  let ticketTags;
  let tags;

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
      tags = action.payload.tags[0].data.tblTags;

      tags = tags.map((tag) => {
        return {
          Type: tag.Type,
          Category: tag["tblTagCategory.Category"],
          BackgroundColor: tag["tblTagCategory.BackgroundColor"],
          Color: tag["tblTagCategory.Color"],
          CategoryID: tag.CategoryID,
        };
      });

      return {
        ...state,
        tags: tags,
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

    case GET_TAG_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case GET_TAG_CATEGORIES_SUCCESS:
      return {
        ...state,
        tagCategories: action.payload.tagCategories[0].data.tblTagCategories,
        loading: false,
        successfull: true,
      };
    case GET_TAG_CATEGORIES_FAILURE:
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
        notification: "Submitted a New Ticket",
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
      expertiseTags = action.payload.expertiseTags[0].data.tblExpertiseTags.map(
        ({ ID, TechnicianID, ...tag }) => tag
      );

      expertiseTags = Object.values(expertiseTags).map(
        (element) => element.TagType
      );

      return {
        ...state,
        loading: false,
        expertiseTags: expertiseTags,
        successfull: true,
      };
    case POST_EXPERTISE_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case POST_TAGS_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case POST_TAGS_SUCCESS:
      tags = action.payload.tags[0].data.tblTags;
      tags = tags.map((tag) => {
        return {
          Type: tag.Type,
          Category: tag["tblTagCategory.Category"],
          BackgroundColor: tag["tblTagCategory.BackgroundColor"],
          Color: tag["tblTagCategory.Color"],
          CategoryID: tag.CategoryID,
        };
      });

      return {
        ...state,
        loading: false,
        tags: tags,
        successfull: true,
      };
    case POST_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case POST_TAG_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case POST_TAG_CATEGORY_SUCCESS:
      return {
        ...state,
        tagCategories: action.payload.tagCategories[0].data.tblTagCategories,
        loading: false,
        successfull: true,
      };
    case POST_TAG_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case DELETE_TAG_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };

    case DELETE_TAG_SUCCESS:
      tags = action.payload.tags[0].data.tblTags;
      tags = tags.map((tag) => {
        return {
          Type: tag.Type,
          Category: tag["tblTagCategory.Category"],
          BackgroundColor: tag["tblTagCategory.BackgroundColor"],
          Color: tag["tblTagCategory.Color"],
          CategoryID: tag.CategoryID,
        };
      });
      return {
        ...state,
        loading: false,
        tags: tags,
        successfull: true,
      };
    case DELETE_TAG_FAILURE:
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
        ticketTags: action.payload.tickets[0].data.tblTicketTags,
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
      expertiseTags = action.payload.expertiseTags[0].data.tblExpertiseTags.map(
        ({ ID, TechnicianID, ...tag }) => tag
      );

      expertiseTags = Object.values(expertiseTags).map(
        (element) => element.TagType
      );

      return {
        ...state,
        loading: false,
        expertiseTags: expertiseTags,
        successfull: true,
      };
    case GET_EXPERTISE_TAGS_FAILURE:
      return {
        ...state,
        successfull: false,
        error: action.payload,
      };

    case GET_TECHNICIANS_ASSIGN_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case GET_TECHNICIANS_ASSIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        techs: action.payload.technicianAssign[0].data.tblUsers_AllTechs,
        expertiseTags_All:
          action.payload.technicianAssign[0].data.tblExpertiseTags_AllTechs,
        techsTicketCount:
          action.payload.technicianAssign[0].data.TechTicketCount[0],
        successfull: true,
      };
    case GET_TECHNICIANS_ASSIGN_FAILURE:
      return {
        ...state,
        successfull: false,
        error: action.payload,
      };

    case PUT_TICKETS_ASSIGN_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case PUT_TICKETS_ASSIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: action.payload.tickets[0].data,
        ticketTags: action.payload.tickets[0].data.tblTicketTags,
        successfull: true,
      };
    case PUT_TICKETS_ASSIGN_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case PUT_TICKETS_AUTO_ASSIGN_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case PUT_TICKETS_AUTO_ASSIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: action.payload.tickets[0].data,
        ticketTags: action.payload.tickets[0].data.tblTicketTags,
        successfull: true,
      };
    case PUT_TICKETS_AUTO_ASSIGN_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case PUT_TICKET_PRIORITY_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case PUT_TICKET_PRIORITY_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: action.payload.tickets[0].data,
        ticketTags: action.payload.tickets[0].data.tblTicketTags,
        successfull: true,
      };
    case PUT_TICKET_PRIORITY_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case PUT_TAGS_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case PUT_TAGS_SUCCESS:
      tags = action.payload.tags[0].data.tblTags;
      tags = tags.map((tag) => {
        return {
          Type: tag.Type,
          Category: tag["tblTagCategory.Category"],
          BackgroundColor: tag["tblTagCategory.BackgroundColor"],
          Color: tag["tblTagCategory.Color"],
          CategoryID: tag.CategoryID,
        };
      });

      return {
        ...state,
        loading: false,
        tags: tags,
        successfull: true,
      };
    case PUT_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        successfull: false,
        error: action.payload,
      };

    case PUT_TAG_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case PUT_TAG_CATEGORIES_SUCCESS:
      tags = action.payload.tagCategories[0].data.tblTags;

      tags = tags.map((tag) => {
        return {
          Type: tag.Type,
          Category: tag["tblTagCategory.Category"],
          BackgroundColor: tag["tblTagCategory.BackgroundColor"],
          Color: tag["tblTagCategory.Color"],
          CategoryID: tag.CategoryID,
        };
      });

      return {
        ...state,
        loading: false,
        tags: tags,
        successfull: true,
      };
    case PUT_TAG_CATEGORIES_FAILURE:
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
      let usersFiltered = action.payload.users[0].data.tblUsers;

      usersFiltered = usersFiltered.filter(
        (element) => element.Approved === null
      );

      return {
        ...state,
        loading: false,
        users: action.payload.users[0].data,
        usersApproved: usersFiltered,
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

      access = access.map((record) => {
        let user = users.find(
          (userRecord) =>
            userRecord.ID === record.UserID && userRecord.Approved !== null
        );

        if (typeof user === "undefined") {
          return false;
        } else {
          let role = roles.find(
            (roleRecord) => roleRecord.Name === record.RoleName
          );

          record.FirstName = user.FirstName;
          record.LastName = user.LastName;

          return record;
        }
      });

      access = access.filter((element) => element !== false);

      return {
        ...state,
        loading: false,
        //roles: action.payload.roles[0].data.tblRoles,
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
        let user = users.find(
          (userRecord) =>
            userRecord.ID === record.UserID && userRecord.Approved !== null
        );

        if (typeof user === "undefined") {
          return false;
        } else {
          let role = roles.find(
            (roleRecord) => roleRecord.Name === record.RoleName
          );

          record.FirstName = user.FirstName;
          record.LastName = user.LastName;

          return record;
        }
      });

      access = access.filter((element) => element !== false);

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
        user: {
          tblAccess: {},
          tblOrganization: {},
          tblUser: { ID: null },
        },
        expertiseTagsLoading: false,
        expertiseTags: [],
        roles: [],
        users: [],
        access: [],
        usersApproved: [],
        tickets: { tblTickets: [] },
        ticketTags: [],
      };

    case PUT_USER_APPROVED_REQUEST:
      return {
        ...state,
        loading: true,
        successfull: false,
      };
    case PUT_USER_APPROVED_SUCCESS:
      let usersApproved = action.payload.users[0].data.tblUsers;

      usersApproved = usersApproved.filter(
        (element) => element.Approved === null
      );
      return {
        ...state,
        loading: false,
        usersApproved: usersApproved,
        successfull: true,
      };
    case PUT_USER_APPROVED_FAILURE:
      return {
        ...state,
        successfull: false,
        error: action.payload,
      };

    case NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
      };

    case NOTIFICATION_CLEAR:
      return {
        ...state,
        notification: "",
      };

    default:
      return state;
  }
};

export default UserReducer;
