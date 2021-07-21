import { useState, useContext, createContext, useEffect } from "react";
import jwt from "jsonwebtoken";

const SECRET_KEY = "abcdefg";
const authContext = createContext();
const { Provider } = authContext;

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const token = localStorage.getItem("token");
  const [isSignIn, setIsSignIn] = useState(token ? true : false);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    try {
      setPayload(jwt.verify(localStorage.getItem("token") ?? "", SECRET_KEY));
    } catch (e) {
      localStorage.clear();
      setIsSignIn(false);
    }
  }, [isSignIn]);

  const UseProvideAuth = {
    payload,
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
