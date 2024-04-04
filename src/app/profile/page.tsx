'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'


export default function ProfilePage()  {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const getUserDetails = async () =>{
    const res = await axios.post("/api/users/me")
    setData(res.data.data._id)
  }

  const logout = async() =>{
    try {
      await axios.get('/api/users/logout');
      toast.success("Logout Success");
      router.push("/login")
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [data])
  



  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'> 
      <h1> Profile Page</h1>
      <hr/>
      <h2>{data === 'nothing' ? "Nothing":""}<Link href={`/profile/${data}`}> {data}</Link></h2>
      <hr />
      <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' 
       onClick={logout}>Logout 
      </button>
    </div>
  )
}

