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
    const payload = jwt.verify(localStorage.getItem("token") ?? "", SECRET_KEY);
    localStorage.setItem("payload", JSON.stringify(payload));
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
    },
  };

  return UseProvideAuth;
}

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <Provider value={auth}>{children}</Provider>;
};
