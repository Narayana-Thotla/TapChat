import React from "react";
import useConversation from "../../../zustand/useConversation";

const MessHeader = ({ conversSelected }) => {

  const { isActive, setisActive } = useConversation();

  const handleClick = () => {
    if (isActive == true) {
      setisActive(false);
    } else {
      setisActive(true);
    }
  };

  return (
    <>
      <div className="h-10 w-[100%] px-4 bg-slate-500 flex items-center font-bold text-gray-300">
        <span>
          <svg
            className={`burger hidden `}
            onClick={handleClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
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
          </svg>
        </span>
        &nbsp; To: &nbsp;{" "}
        <div className="text-slate-800">{conversSelected.name}</div>
      </div>
    </>
  );
};

export default MessHeader;
