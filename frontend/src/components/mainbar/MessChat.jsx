import React from "react";
import { useState, useEffect, useRef } from "react";
import useConversation from "../../../zustand/useConversation";
import MessGetFromSer from "./MessGetFromSer.jsx";
import useListenMessages from "../../../hooks/useListenMessages.js";

const MessChat = ({ conversSelected }) => {
  const [getMess, setgetMess] = useState([]);
  const [loading, setloading] = useState(false);
  const {
    selectedConversation,
    setSelectedConversation,
    messages,
    setMessages,
  } = useConversation();

  const containerRef = useRef(null);

  useListenMessages();

  useEffect(() => {
    const gettingMessages = async () => {
      try {
        setloading(true);

        if (selectedConversation?._id) {
          let response = await fetch(
            `/api/message/${selectedConversation._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          const data = await response.json();
          // console.log(data);
          setgetMess(data);

          setMessages(data);
        }
      } catch (error) {
        console.log("MESSCHAT error Line-47:", error.message);
      } finally {
        setloading(false);
      }
    };

    if (selectedConversation._id) gettingMessages();
    //------------------------------------------------------

    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [300]);
  }, [selectedConversation, selectedConversation]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  return (
    <div
      ref={containerRef}
      className="px-5 h-4/5 w-full mb-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
    >
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? containerRef : null}
          >
            <MessGetFromSer mess={message} conver={conversSelected} />
          </div>
        ))}

      {!loading && messages.length <= 0 && (
        <p className="text-center">
          Send a message to start a new conversation
        </p>
      )}
    </div>
  );
};

export default MessChat;
