import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./ProvideAuth";

export const PrivateRoute = ({ children, ...props }) => {
  const { isSignIn } = useAuth();

  return !isSignIn ? (
    <Redirect to="/signin" />
  ) : (
    <Route {...props}>{children}</Route>
  );
};
