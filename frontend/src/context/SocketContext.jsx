import { Children, createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { UseAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const UseSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "UseSocketContext must be used within an SocketContextProvider"
    );
  }

  return context;
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);
  const [onlineUsers, setonlineUsers] = useState([]);
  const { authUser } = UseAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:3000", {
        query: {
          userId: authUser._id,
        },
      });
      setsocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setonlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setsocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
