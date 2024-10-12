import React from "react";
import toast from "react-hot-toast";
import { useState,useEffect } from "react";

const useGetConversation = () => {
  const [loading, setloading] = useState(false);
  const [conversation, setconversation] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setloading(true);
      try {
        // const res = await fetch("http://localhost:3000/api/user");
        let response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });
        const data = await response.json();
        // console.log("data being retrieved in api/user",data)
        if(data.error) throw new Error(data.error);
        setconversation(data);
      } catch (error) {
        toast.error(error.message)
      }finally{
        setloading(false);
      }
    };
    getConversation();
  }, []);

  return {loading,conversation}
};

export default useGetConversation;
