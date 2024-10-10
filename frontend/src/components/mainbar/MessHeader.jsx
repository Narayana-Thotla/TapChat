import React from "react";

const MessHeader = ({conversSelected}) => {
  return (
    <>
      <div className="h-10 w-[100%] px-4 bg-slate-500 flex items-center font-bold text-gray-300">
        To: &nbsp; <div className="text-slate-800">{conversSelected.name}</div>
      </div>
    </>
  );
};

export default MessHeader;
