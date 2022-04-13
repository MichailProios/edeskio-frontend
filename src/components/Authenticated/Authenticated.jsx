import React, { useEffect } from "react";
import CircularProgress from "../CircularLoading/CircularLoading.jsx";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllTagsAction,
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

  useEffect(() => {
    if (sessionUsername.length !== 0) {
      dispatch(getUserAction(sessionUsername));
    }
  }, [dispatch, sessionUsername]);

  useEffect(() => {
    dispatch(getAllTagsAction());
    dispatch(getUsersAllAction());
  }, [dispatch]);

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
