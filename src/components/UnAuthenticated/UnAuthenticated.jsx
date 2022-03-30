import React from "react";

import { useSelector } from "react-redux";

const UnAuthenticated = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.User.authenticated);

  if (!isAuthenticated) {
    return <div>{children}</div>;
  } else {
    return <div />;
  }
};

export default UnAuthenticated;
