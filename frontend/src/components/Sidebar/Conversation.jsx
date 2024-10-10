import React from "react";
import useConversation from "/zustand/useConversation.js";
import { UseSocketContext } from "../../context/SocketContext";

const Conversation = (props) => {
  // console.log("props from  conversation line-5:", props.convers);

  const smileyEmojis = [
    "😀",
    "😁",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😄",
    "😎",
  ];

  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * smileyEmojis.length);
    return smileyEmojis[randomIndex];
  };

  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === props.convers._id;

  const {onlineUsers} = UseSocketContext()
  const isOnline = onlineUsers.includes(props.convers._id)

  return (
    <>
      <div
        className={`flex rounded-lg h-12 items-center gap-3 cursor-pointer hover:bg-sky-500 ${
          isSelected ? "bg-sky-500" : ""
        }`} onClick={()=>{setSelectedConversation(props.convers)}}
      >
        <div className={`avatar ml-1 ${isOnline?"online" : ""} `}>
          <div className="w-11 rounded-full">
            <img className="" src={props.profilepic} />
          </div>
        </div>

        <div className="">
          <div className="flex  w-[250px] justify-between ">
            <p className="font-bold text-lg text-gray-300">{props.name}</p>
            <span>{getRandomEmoji()}</span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0"></div>
    </>
  );
};

export default Conversation;
