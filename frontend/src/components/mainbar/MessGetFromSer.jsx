import React from "react";
import { useRef,useEffect } from "react";
import useConversation from "../../../zustand/useConversation";
import { UseAuthContext } from "../../context/AuthContext.jsx";
import useListenMessages from "../../../hooks/useListenMessages.js";

const MessGetFromSer = ({mess,conver}) => {
  const containerRef = useRef(null);
  useListenMessages()
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
//   const profilepic = fromME ? authUser.profilepic :null
  const bubble = fromME ? "bg-sky-600" : "";
const shake = mess.shouldShake ? "shake" : ""


const date = new Date(mess.createdAt);

// Options for formatting the date
const options = {
    year: 'numeric',
    month: 'long', // 'short' for abbreviated month
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // Set to false for 24-hour format
};

// Format the date
const formattedDate = date.toLocaleString('en-US', options);



// useEffect(() => {
//   if (containerRef.current) {
//     containerRef.current.scrollTop = containerRef.current.scrollHeight;
//   }
// }, [setMessages])


  return (
    <div ref={containerRef}>
      {/* <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>

        <div className="chat-bubble">You were the Chosen One!</div>
        <div className="chat-footer opacity-100">Seen at 12:46</div>
      </div> */}

      <div className={`chat ${chatClassName} ${shake}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={profilepic}
            />
          </div>
        </div>

        <div className={`chat-bubble ${bubble}`}>{`${mess.message}`}</div>
        <div className="chat-footer opacity-100">{`${formattedDate}`}</div>
      </div>
    </div>
  );
};

export default MessGetFromSer;
