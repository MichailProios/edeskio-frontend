import React, { useEffect } from "react";
import CircularPogress from "../CircularLoading/CircularLoading.jsx";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllTagsAction,
  getUserAction,
  getUsersAllAction,
} from "../../redux/user/userActions.js";

const Authenticated = ({ children }) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.User.authenticated);

  const loading = useSelector((state) => state.User.userLoading);

  const sessionUsername = useSelector((state) => state.User.sessionUser);

  console.log(sessionUsername);

  useEffect(() => {
    if (sessionUsername !== "") {
      dispatch(getUserAction(sessionUsername));
    }
  }, [dispatch, sessionUsername]);

  useEffect(() => {
    dispatch(getAllTagsAction());
    dispatch(getUsersAllAction());
  }, [dispatch]);

  if (isAuthenticated && sessionUsername !== "") {
    return <div>{children}</div>;
  } else {
    return <CircularPogress />;
  }
};

export default Authenticated;
