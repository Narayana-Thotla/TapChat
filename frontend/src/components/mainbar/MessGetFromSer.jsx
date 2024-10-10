import React from "react";
import { useRef, useEffect } from "react";
import useConversation from "../../../zustand/useConversation";
import { UseAuthContext } from "../../context/AuthContext.jsx";
import useListenMessages from "../../../hooks/useListenMessages.js";

const MessGetFromSer = ({ mess, conver }) => {
  const containerRef = useRef(null);
  useListenMessages();
  const {
    selectedConversation,
    setSelectedConversation,
    messages,
    setMessages,
  } = useConversation();

  const { authUser } = UseAuthContext();
  const fromME = mess.senderId === authUser._id;
  const chatClassName = fromME ? "chat-end" : "chat-start";
  const profilepic = fromME ? authUser.profilepic : conver?.profilepic;
  const bubble = fromME ? "bg-sky-600" : "";
  const shake = mess.shouldShake ? "shake" : "";

  const date = new Date(mess.createdAt);

  const options = {
    year: "numeric",
    month: "long", // 'short' for abbreviated month
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Set to false for 24-hour format
  };

  const formattedDate = date.toLocaleString("en-US", options);

  return (
    <div ref={containerRef}>
      <div className={`chat ${chatClassName} ${shake}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilepic} />
          </div>
        </div>

        <div className={`chat-bubble ${bubble}`}>{`${mess.message}`}</div>
        <div className="chat-footer opacity-100">{`${formattedDate}`}</div>
      </div>
    </div>
  );
};

export default MessGetFromSer;
