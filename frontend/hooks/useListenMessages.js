import React from "react";
import { UseSocketContext } from "../src/context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useEffect, useState ,useCallback} from "react";

const useListenMessages = () => {
  const { socket } = UseSocketContext();
  const { messages, setMessages } = useConversation();


  const handleNewMessage = useCallback((newMessage) => {
    console.log("inside the socket?.on");
    console.log("uselistmess line-12 inside sockets:", newMessage);
    newMessage.shouldShake = true
    setMessages([...messages, newMessage]);
  }, [setMessages]);

  useEffect(() => {
    if (!socket) {
      console.log("Socket is not available yet inside useEffect");
      return;
    }

    if (socket && socket.connected) {


      socket.on("haha", handleNewMessage)
    }

    return () => {
      socket.off("haha",handleNewMessage);
    };
  }, [socket, setMessages]);
};

export default useListenMessages;
