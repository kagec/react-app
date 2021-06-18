import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import TodoApp from "./components/TodoApp";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {
  const [signIn, setSignIn] = useState(false);

  const toggleSignIn = () => {
    setSignIn(!signIn);
  };
  return (
    <Router>
      {signIn ? (
        <Switch>
          <Route exact path="/todos" component={TodoApp} />
          <Redirect to="/todos" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/signin">
            <SignIn setSignIn={toggleSignIn} />
          </Route>
          <Route exact path="/signup" component={SignUp} />
          <Redirect to="/signin" />
        </Switch>
      )}
    </Router>
  );
};

export default App;
