import React from "react";
import Conversation from "./Conversation.jsx";
import "./Conversations.css";
import "../../index.css";
import useGetConversation from "../../../hooks/useGetConversation.js";

const Conversations = () => {
  const { loading, conversation } = useGetConversation();
  // console.log("conversations in useGetConversation:", conversation);

  if (loading) {
    return <div className="loading loading-spinner">Loading...</div>; // Show a loading message
  }

  return (
    <div className="h-3/5  overflow-y-auto scrollbar-none  ">
      {conversation.map((item, index) => {
        return (
          <Conversation
            key={index}
            name={item.name}
            profilepic={item.profilepic}
            convers={item}
          />
        );
      })}
    </div>
  );
};

export default Conversations;
