import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { permissionasync } from '../../../redux-toolkit/slices/acceptRejectPermission';
import { TYPE, useMsgErr } from '../../../context/MsgAndErrContext';

export default function ArangementClass() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {setMsgType,setMsg} = useMsgErr()

  const clickHandler = async(responseToReq)=>{
    try {
      dispatch(permissionasync({
        status:responseToReq
      }))
      if(permissionStore.isErr){
        setMsgType(TYPE.Err)
        setMsg(permissionStore.Err)
      }
      // navigate("/markattendance")
    } catch (error) {
      console.log(error)
    }
  }

  const permissionStore = useSelector(state=>state.permission)

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <h1 className='text-2xl font-bold m-2 p-1'>Arangement Class</h1>
      <div className='flex flex-col p-2 m-2 border-2 border-gray-600 rounded'>
        <p className=' text-base m-1 font-bold text-center'>Can you please attend my class in 4-CSBS at 01:15 PM on this Tuesday.</p>
        <p className=' text-base m-1 font-bold text-center'>Here is your access to the attendance, please be sure to add the attendance on time.</p>
        <button className='m-1 p-2 border-2 bg-green-600 text-dimWhite border-gray-600 rounded font-bold w-fit self-end' onClick={()=>clickHandler("accept")}>Accept</button>
        <button className='m-1 p-2 border-2 bg-red-600 text-dimWhite border-gray-600 rounded font-bold w-fit self-end' onClick={()=>clickHandler("accept")}>Reject</button>
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
