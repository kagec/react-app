import { useState, useContext, createContext } from "react";

const authContext = createContext();
const { Provider } = authContext;

export const useAuth = () => {
  return useContext(authContext);
};

export const ProvideAuth = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState(false);

  const auth = {
    isSignIn,
    signIn() {
      setIsSignIn(true);
    },
    signOut() {
      setIsSignIn(false);
    },
  };

  return <Provider value={auth}>{children}</Provider>;
};
