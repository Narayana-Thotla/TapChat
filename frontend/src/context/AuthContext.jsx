import { createContext, useContext, useState,useEffect } from "react";

export const AuthContext = createContext();

export const UseAuthContext = () => {
  // Return the context value
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "UseAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
};

export  const AuthContextProvider = ({ children }) => {
  const [authUser, setauthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("chat-user");
    }
  }, [authUser]);
  return (
    <AuthContext.Provider  value={{ authUser, setauthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
