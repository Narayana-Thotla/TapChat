import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import MessageContainer from "../../components/mainbar/MessageContainer.jsx";

const Home = () => {
  return (
    <div className="flex  justify-center items-center h-screen">
      <div className="flex  w-[70vw] sm:h-[450px] md:h-[550px] overflow-hidden glass-effect">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
