import React from 'react'
import SearchInput from './SearchInput.jsx'
import Conversations from './Conversations.jsx'
import Logout from './Logout.jsx'

const Sidebar = () => {
  return (
    <div className='border-r-[2.5px] w-[40%] border-[#3c5562] pr-5 p-5'>
      <SearchInput/>
      <Conversations />
      <Logout />
    </div>
  )
}

export default Sidebar
