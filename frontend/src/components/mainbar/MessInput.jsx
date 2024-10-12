import React from "react";
import { IoSend } from "react-icons/io5";
import { IoAttach } from "react-icons/io5";
import { useState } from "react";
import useConversation from "../../../zustand/useConversation";

const MessInput = ({ conversSelected }) => {
  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(false);
  const { messages, setMessages } = useConversation();

  const sendingMessage = async () => {
    if (!message.trim()) {
      return; // Don't send an empty message
    }

    try {
      setloading(true);


      let response = await fetch(
        `/api/message/send/${conversSelected._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ message }),
        }
      );

      const data = await response.json();
       if(response.ok) setMessages([...(messages || []), data]);
      setMessage("");
    } catch (error) {
      console.log("error in messinput.jsx line-37:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex mx-auto text-gray-200 rounded-[5px] h-10 w-[85%]   ">
      <div className="w-[95%] flex relative bg-slate-700 rounded-md ">
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input  w-full h-10 bg-slate-700   outline-none placeholder-slate-200 "
        />
        <IoAttach
          size={32}
          className="my-2 mx-2 absolute right-0 cursor-pointer"
        />
      </div>
      <div
        className="flex justify-center bg-slate-800 mx-1 rounded-md cursor-pointer"
        onClick={sendingMessage}
        // disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <IoSend className="mx-3 mt-3  " />
        )}
      </div>
    </div>
  );
};

export default MessInput;
