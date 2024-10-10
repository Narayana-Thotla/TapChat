import React from "react";
import { UseSocketContext } from "../src/context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useEffect, useState ,useCallback} from "react";
import { io } from "socket.io-client";

const useListenMessages = () => {
  const { socket } = UseSocketContext();
  const { messages, setMessages } = useConversation();
  const [first, setfirst] = useState(null);

  // console.log(socket)


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

      socket.on('nm',(m)=>{
        console.log(m)
      })

      socket.on("haha", handleNewMessage)
      //   (newMessage) => {
      //   // console.log("Socket connected:", socket.connected);
      //   console.log("inside the socket?.on");
      //   console.log("uselistmess line-12 inside sockets:", newMessage);
      //   setMessages([...messages, newMessage]);
      // });
    }

    return () => {
      socket.off("haha",handleNewMessage);
      // socket.off('nni')
    };
  }, [socket, setMessages]);
};

export default useListenMessages;
