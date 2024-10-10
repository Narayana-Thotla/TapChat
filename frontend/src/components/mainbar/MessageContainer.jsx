import React from "react";
import MessHeader from "./MessHeader";
import MessChat from "./MessChat";
import MessInput from "./MessInput";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import useConversation from "/zustand/useConversation.js";
import { useEffect } from "react";
import { UseAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {

   const username = UseAuthContext();
   const nameOfUser = username.authUser.name
   
  const { selectedConversation, setSelectedConversation ,setMessages} = useConversation();
  
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, []);

  return (
    <>
      {selectedConversation ? (
        <div className="w-[60%]">
          <MessHeader conversSelected={selectedConversation} />
          <MessChat conversSelected={selectedConversation} setMessages={setMessages}/>
          <MessInput conversSelected={selectedConversation} />
        </div>
      ) : (
        <NoMessage nameOfUser={nameOfUser}/>
      )}
    </>
  );
};

const NoMessage = ({nameOfUser}) => {
  return (
    <div className="w-[60%] flex justify-center items-center">
      <div className="flex  flex-col justify-center">
        <p className="font-extrabold text-gray-200 mx-auto">
        { ` Welcome 👋 ${nameOfUser}`}
        </p>
        <p className="font-extrabold text-gray-200 mx-auto">
          Select a chat to start messaging
        </p>
        <HiOutlineChatAlt2 size={200} className="text-gray-300 ml-11" />
      </div>
    </div>
  );
};

export default MessageContainer;
