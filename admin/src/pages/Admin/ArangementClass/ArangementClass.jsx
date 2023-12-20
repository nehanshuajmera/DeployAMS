import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ArangementClass() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <h1 className='text-2xl font-bold m-2 p-1'>Arangement Class</h1>
      <div className='flex flex-col p-2 m-2 border-2 border-gray-600 rounded'>
        <p className=' text-base m-1 font-bold text-center'>Can you please attend my class in 4-CSBS at 01:15 PM on this Tuesday.</p>
        <p className=' text-base m-1 font-bold text-center'>Here is your access to the attendance, please be sure to add the attendance on time.</p>
        <button className='m-1 p-2 border-2 border-gray-600 rounded font-bold w-fit self-end' onClick={()=>navigate("/markattendance")}>Mark Attendance</button>
      </div>
      <div className='flex flex-col p-2 m-2 border-2 border-gray-600 rounded'>
        <p className=' text-base m-1 font-bold text-center'>Can you please attend my class in 4-CSBS at 01:15 PM on this Tuesday.</p>
        <p className=' text-base m-1 font-bold text-center'>Here is your access to the attendance, please be sure to add the attendance on time.</p>
        <button className='m-1 p-2 border-2 border-gray-600 rounded font-bold w-fit self-end' onClick={()=>navigate("/markattendance")}>Mark Attendance</button>
      </div>
      <div className='flex flex-col p-2 m-2 border-2 border-gray-600 rounded'>
        <p className=' text-base m-1 font-bold text-center'>Can you please attend my class in 4-CSBS at 01:15 PM on this Tuesday.</p>
        <p className=' text-base m-1 font-bold text-center'>Here is your access to the attendance, please be sure to add the attendance on time.</p>
        <button className='m-1 p-2 border-2 border-gray-600 rounded font-bold w-fit self-end' onClick={()=>navigate("/markattendance")}>Mark Attendance</button>
      </div>
      <div className='flex flex-col p-2 m-2 border-2 border-gray-600 rounded'>
        <p className=' text-base m-1 font-bold text-center'>Can you please attend my class in 4-CSBS at 01:15 PM on this Tuesday.</p>
        <p className=' text-base m-1 font-bold text-center'>Here is your access to the attendance, please be sure to add the attendance on time.</p>
        <button className='m-1 p-2 border-2 border-gray-600 rounded font-bold w-fit self-end' onClick={()=>navigate("/markattendance")}>Mark Attendance</button>
      </div>
      <div className='flex flex-col p-2 m-2 border-2 border-gray-600 rounded'>
        <p className=' text-base m-1 font-bold text-center'>Can you please attend my class in 4-CSBS at 01:15 PM on this Tuesday.</p>
        <p className=' text-base m-1 font-bold text-center'>Here is your access to the attendance, please be sure to add the attendance on time.</p>
        <button className='m-1 p-2 border-2 border-gray-600 rounded font-bold w-fit self-end' onClick={()=>navigate("/markattendance")}>Mark Attendance</button>
      </div>
    </div>
  )
}
