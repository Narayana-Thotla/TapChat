import React from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../../zustand/useConversation";
import useGetConversation from "../../../hooks/useGetConversation";
import toast from "react-hot-toast";
import { useState } from "react";

const SearchInput = () => {
  const [search, setsearch] = useState("");
  const { selectedConversation, setSelectedConversation, messages } =
    useConversation();
  const { loading, conversation } = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search input must be atleast 4 characters!");
    }
    const conversations = conversation.find((c) => {
      if (c.name.toLowerCase().includes(search.toLowerCase())) return c.name;
    });
    console.log("search input:", conversations, search);

    if (conversations) {
      setSelectedConversation(conversations);
      setsearch("");
    } else {
      toast.error("No such user found!");
    }
  };

  return (
    <>
      <div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex justify-center items-center gap-2"
        >
          <input
            cal
            type="text"
            placeholder="Search.."
            className="input input-bordered placeholder-slate-200 text-gray-200 rounded-full h-10 bg-slate-800"
            value={search}
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          />
          <button
            type="submit"
            className="h-10 w-10 rounded-full flex items-center justify-center bg-sky-500  text-white"
          >
            <FaSearch size={18} />
          </button>
        </form>
      </div>
      <div className="divider px-0 "></div>
    </>
  );
};

export default SearchInput;
