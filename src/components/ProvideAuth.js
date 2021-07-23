import { useState, useContext, createContext } from "react";
import jwt from "jsonwebtoken";

const SECRET_KEY = "abcdefg";
const authContext = createContext();
const { Provider } = authContext;

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  try {
    jwt.verify(localStorage.getItem("token") ?? "", SECRET_KEY);
  } catch (e) {
    localStorage.clear();
  }

  const token = localStorage.getItem("token");
  const [isSignIn, setIsSignIn] = useState(token ? true : false);

  const UseProvideAuth = {
    isSignIn,
    signIn() {
      setIsSignIn(true);
    },
    signOut() {
      setIsSignIn(false);
      localStorage.clear();
    },
  };

  return UseProvideAuth;
}

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <Provider value={auth}>{children}</Provider>;
};
