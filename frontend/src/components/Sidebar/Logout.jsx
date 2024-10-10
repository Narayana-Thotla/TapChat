import React from "react";
import { TbLogout2 } from "react-icons/tb";
import useLogout from "../../../hooks/useLogout.js";

const Logout = () => {
  const { loading, logOut } = useLogout();
  return (
    <>
      <div className="divider py-0 "></div>
      <div className="text-gray-300  ml-2 ">
        {!loading ? (
          <TbLogout2 size={32} className="cursor-pointer" onClick={logOut} />
        ) : (
          <span className="loading loading-spinner"></span>
        )}
      </div>
    </>
  );
};

export default Logout;
