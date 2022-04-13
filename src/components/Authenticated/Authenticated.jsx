import React, { useEffect } from "react";
import CircularProgress from "../CircularLoading/CircularLoading.jsx";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllTagsAction,
  getExpertiseTagsOneAction,
  getUserAction,
  getUsersAllAction,
  getUserSessionAction,
} from "../../redux/user/userActions.js";
import ApprovalNeeded from "../ApprovalNeeded/ApprovalNeeded.jsx";

const Authenticated = ({ children }) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.User.authenticated);

  const loading = useSelector((state) => state.User.userLoading);

  const sessionUsername = useSelector((state) => state.User.sessionUser);

  const status = useSelector((state) => state.User.user.tblUser.Approved);

  const user = useSelector((state) => state.User.user.tblUser.ID);

  const organizationID = useSelector(
    (state) => state.User.user.tblOrganization.ID
  );

  useEffect(() => {
    if (sessionUsername.length !== 0) {
      dispatch(getUserAction(sessionUsername));
    }
  }, [dispatch, sessionUsername]);

  useEffect(() => {
    dispatch(getAllTagsAction());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      if (organizationID.toString().length > 0) {
        dispatch(getUsersAllAction(organizationID));
      }
    }
  }, [dispatch, organizationID, user]);

  useEffect(() => {
    if (user) {
      dispatch(getExpertiseTagsOneAction(user));
    }
  }, [dispatch, user]);

  if (isAuthenticated) {
    if (!loading) {
      if (status) {
        return <div>{children}</div>;
      } else {
        return <ApprovalNeeded status={status} />;
      }
    } else {
      return <CircularProgress />;
    }
  } else {
    return <div />;
  }
};

export default Authenticated;
