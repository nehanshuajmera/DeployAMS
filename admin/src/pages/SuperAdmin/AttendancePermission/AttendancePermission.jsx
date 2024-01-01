import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TYPE, useMsgErr } from '../../../context/MsgAndErrContext'
import { permissionasync } from '../../../redux-toolkit/slices/acceptRejectPermission'

export default function AttendancePermission() {
  const dispatch = useDispatch()
  const {setMsgType,setMsg} = useMsgErr()

  const clickHandler = async(responseToReq)=>{
    try {
      const payload={
        ID:"id",
        data:{
          status:responseToReq
        }
      }
      dispatch(permissionasync(payload))
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
    <div className='flex justify-center items-center flex-col p-2'>
      <h1 className='text-center m-1 p-1 text-xl'>Attendance Permission</h1>
      <div className="seePermission flex flex-col my-2 p-4 border-2 border-gray-600 rounded">
        <div className="permissionContainer">
          <div className="permissionInfo">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, enim. Dolores aspernatur porro eius tempora velit voluptatum ad natus, quidem minima saepe ab consectetur libero voluptas odio architecto? Quasi, repudiandae corrupti omnis veniam voluptatum voluptatem in, dignissimos praesentium sit at, expedita voluptas commodi accusamus laborum?</p>
          </div>
        </div>
        <div className="permissionBtn self-end">
          <button className='mx-1 px-2 py-1 border-2 rounded border-gray-600 bg-green-600 text-dimWhite' onClick={()=>clickHandler("Accepted")}>Accept</button>
          <button className='mx-1 px-2 py-1 border-2 rounded border-gray-600 bg-red-600 text-dimWhite' onClick={()=>clickHandler("Rejected")}>Reject</button>
        </div>
      </div>
      <div className="seePermission flex flex-col my-2 p-4 border-2 border-gray-600 rounded">
        <div className="permissionContainer">
          <div className="permissionInfo">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, enim. Dolores aspernatur porro eius tempora velit voluptatum ad natus, quidem minima saepe ab consectetur libero voluptas odio architecto? Quasi, repudiandae corrupti omnis veniam voluptatum voluptatem in, dignissimos praesentium sit at, expedita voluptas commodi accusamus laborum?</p>
          </div>
        </div>
        <div className="permissionBtn self-end">
          <button className='mx-1 px-2 py-1 border-2 rounded border-gray-600'>Accept</button>
          <button className='mx-1 px-2 py-1 border-2 rounded border-gray-600'>Reject</button>
        </div>
      </div>
      <div className="seePermission flex flex-col my-2 p-4 border-2 border-gray-600 rounded">
        <div className="permissionContainer">
          <div className="permissionInfo">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, enim. Dolores aspernatur porro eius tempora velit voluptatum ad natus, quidem minima saepe ab consectetur libero voluptas odio architecto? Quasi, repudiandae corrupti omnis veniam voluptatum voluptatem in, dignissimos praesentium sit at, expedita voluptas commodi accusamus laborum?</p>
          </div>
        </div>
        <div className="permissionBtn self-end">
          <button className='mx-1 px-2 py-1 border-2 rounded border-gray-600'>Accept</button>
          <button className='mx-1 px-2 py-1 border-2 rounded border-gray-600'>Reject</button>
        </div>
      </div>
    </div>
  )
}
