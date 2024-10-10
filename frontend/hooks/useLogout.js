import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { UseAuthContext } from '../src/context/AuthContext'


const useLogout =  ()=>{
    const [loading, setloading] = useState(false)
    const {setauthUser} = UseAuthContext()

    
    const logOut = async () => {
        setloading(true)
        try {
            let response = await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
              });
              const data = await response.json();
              if(data.error)throw new Error(data.error)

                localStorage.removeItem('chat-user')
                setauthUser(null)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setloading(false)
        }
    
    }
    return   {loading,logOut}  
    
}

export default useLogout
