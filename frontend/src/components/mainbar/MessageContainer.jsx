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
  const nameOfUser = username.authUser.name;

  const {
    selectedConversation,
    setSelectedConversation,
    setMessages,
    isActive,
    setisActive,
  } = useConversation();

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, []);

  return (
    <>
      {selectedConversation ? (
        <div className="w-[60%] messAfterResponse">
          {/* <div>hi</div> */}
          <MessHeader conversSelected={selectedConversation} />
          <MessChat
            conversSelected={selectedConversation}
            setMessages={setMessages}
          />
          <MessInput conversSelected={selectedConversation} />
        </div>
      ) : (
        <NoMessage nameOfUser={nameOfUser} />
      )}
    </>
  );
};

const NoMessage = ({ nameOfUser }) => {
  // const [isActive, setIsActive] = useState(false);

  const { isActive, setisActive } = useConversation();

  const handleClick = () => {
    if (isActive == true) {
      setisActive(false);
    } else {
      setisActive(true);
    }
  };

  return (
    <div className="rightPhone  w-[60%] flex justify-center items-center">
      <div>
        <div className="  flex  flex-col justify-center">
          <div className="relative bottom-56 right-3 ">
            <svg
              className={`burger hidden `}
              onClick={handleClick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="44"
              height="44"
              color="#000000"
              fill="none"
            >
              <path
                d="M4 5L20 5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 12L20 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 19L20 19"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>{" "}
          </div>
          <p className="font-extrabold text-gray-200 mx-auto">
            {` Welcome 👋 ${nameOfUser}`}
          </p>
          <p className="font-extrabold text-gray-200 mx-auto">
            Select a chat to start messaging
          </p>
          <HiOutlineChatAlt2 size={200} className="text-gray-300 ml-11" />
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
