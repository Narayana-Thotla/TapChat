import React from "react";
import { useState, useEffect, useRef } from "react";
import useConversation from "../../../zustand/useConversation";
import { UseAuthContext } from "../../context/AuthContext.jsx";
import MessGetFromSer from "./MessGetFromSer.jsx";
import useListenMessages from "../../../hooks/useListenMessages.js";
import { UseSocketContext } from "../../context/SocketContext.jsx";
import { io } from "socket.io-client";
// import useConversation from '../zustand/useConversation';

const MessChat = ({ conversSelected }) => {
  const [getMess, setgetMess] = useState([]);
  const [loading, setloading] = useState(false);
  // const { socket } = UseSocketContext();
  // const messageEndRef = useRef(null);

  const {
    selectedConversation,
    setSelectedConversation,
    messages,
    setMessages,
  } = useConversation();

  // const { socket } = UseSocketContext();
  // const  {messages,setMessages} = useConversation();

  const containerRef = useRef(null);
  const prevMessagesLength = useRef(messages.length);

  useListenMessages();

  useEffect(() => {
    const gettingMessages = async () => {
      try {
        setloading(true);

        if (selectedConversation?._id) {
          let response = await fetch(
            `http://localhost:3000/api/message/${selectedConversation._id}`,
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

  // useListenMessages();
  // useEffect(() => {
  //   socket?.on('newMessage',(newMessage)=>{
  //       console.log("uselistmess line-12 inside sockets:",newMessage)
  //       setMessages([...messages,newMessage])
  //   })

  //   return ()=>{socket.off("newMessage")}
  // }, [socket,setMessages,messages])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  // console.log("heheh kokapet");
  // console.log("responsed in MESSCHAT line-32:", messages);

  // useListenMessages();

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

      {/* <div ref={messageEndRef} /> */}

      {!loading && messages.length <= 0 && (
        <p className="text-center">
          Send a message to start a new conversation
        </p>
      )}

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
        <div className="chat-footer opacity-100 ">Delivered</div>
      </div> */}

      {/* <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={profilepic}
            />
          </div>
        </div>

        <div className={`chat-bubble ${bubble}`}>I hate you!</div>
        <div className="chat-footer opacity-100">Seen at 12:46</div>
      </div> */}

      {/* <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>

        <div className="chat-bubble bg-sky-600">I hate you!</div>
        <div className="chat-footer opacity-100 ">Seen at 12:46</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>

        <div className="chat-bubble bg-sky-600">I hate you!</div>
        <div className="chat-footer opacity-100 ">Seen at 12:46</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>

        <div className="chat-bubble bg-sky-600">I hate you!</div>
        <div className="chat-footer opacity-100 ">Seen at 12:46</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>

        <div className="chat-bubble bg-sky-600">I hate you!</div>
        <div className="chat-footer opacity-100 ">Seen at 12:46</div>
      </div> */}
    </div>
  );
};

export default MessChat;
