import React from "react";
import { Switch, Redirect } from "react-router-dom";
import TodoApp from "./components/TodoApp";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { PrivateRoute } from "./components/PrivateRoute";
import { UnAuthRoute } from "./components/UnAuthRoute";
import ChangePassword from "./components/ChangePassword";

const App = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/todos" component={TodoApp} />
      <UnAuthRoute exact path="/signin" component={SignIn} />
      <UnAuthRoute exact path="/signup" component={SignUp} />
      <PrivateRoute exact path="/change/password" component={ChangePassword} />
      <Redirect to="/todos" />
    </Switch>
  );
};

export default App;
