import React from "react";
import MessHeader from "./MessHeader";
import MessChat from "./MessChat";
import MessInput from "./MessInput";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import useConversation from "/zustand/useConversation.js";
import { useEffect } from "react";

const MessageContainer = () => {
  // const noChatSelected = false;

  const { selectedConversation, setSelectedConversation ,setMessages} = useConversation();
  // console.log(
  //   "selectedconversation in message container line - 12:",
  //   selectedConversation
  // );

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
        <NoMessage />
      )}
    </>
  );
};

const NoMessage = () => {
  return (
    <div className="w-[60%] flex justify-center items-center">
      <div className="flex  flex-col justify-center">
        <p className="font-extrabold text-gray-200 mx-auto">
          Welcome 👋 lakshmi
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
