import React from "react";
import "../../App.css"
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import MessageContainer from "../../components/mainbar/MessageContainer.jsx";

const Home = () => {
  return (
    <div className="flex  justify-center items-center h-screen">
      <div className="actualContainer absolute flex  w-[70vw] sm:h-[450px] md:h-[550px] overflow-hidden glass-effect">
        <Sidebar className="sideBar" />
        <MessageContainer className="messageCont" />
      </div>
    </div>
  );
};

export default Home;
