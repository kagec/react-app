import { useState, useContext, createContext } from "react";

const authContext = createContext();
const { Provider } = authContext;

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [isSignIn, setIsSignIn] = useState(false);

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
