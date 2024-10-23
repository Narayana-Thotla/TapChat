import {React} from 'react'
import SearchInput from './SearchInput.jsx'
import Conversations from './Conversations.jsx'
import Logout from './Logout.jsx'
import useConversation from '../../../zustand/useConversation.js'
import { useEffect } from 'react'


const Sidebar = () => {
  const {isActive,setisActive,selectedConversation,setSelectedConversation} =useConversation();
  console.log("isActive value:",isActive)

useEffect(() => {
 setisActive(false)
}, [selectedConversation,setSelectedConversation])


  return (
    <div className={`${isActive ? '' : "sideBar"}  actSideBar border-r-[2.5px] w-[40%] border-[#3c5562] pr-5 p-5`}>
      <SearchInput/>
      <Conversations />
      <Logout />
    </div>
  )
}

export default Sidebar
