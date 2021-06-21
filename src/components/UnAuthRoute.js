import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./ProvideAuth";

import React from "react";

export const UnAuthRoute = ({ children, ...props }) => {
  const { isSignIn } = useAuth();

  return isSignIn ? (
    <Redirect to="/todos" />
  ) : (
    <Route {...props}>{children}</Route>
  );
};
