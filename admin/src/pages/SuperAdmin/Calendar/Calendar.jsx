import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAcademicAsync } from '../../../redux-toolkit/slices/academicCalenderslice'

const semDate = {
  startDate : '',
  endDate : '',
}

export default function Calendar() {
  const [dates, setDates] = useState(semDate)
  const dispatch = useDispatch()

  const changeHandler = (e)=>{
    setDates(prev=>{
      return{
        ...prev,
        [e.target.name]:e.target.value,
      }
    })
    console.log(dates)
  }

  const HandleClick = ()=>{
    
      ;(async()=>{
        try{  
          await dispatch(createAcademicAsync({...dates}));
  
        }catch(error){
            console.log(error);
        }
      })()
   
  }

  return (
    <div className='flex justify-center align items-center w-full h-screen bg-dimWhite'>
      {/* Semister start-end Form  */}
      <div className="addDateSide flex flex-col p-1 m-2 w-1/3 justify-center items-center">
        <h3 className='m-1 p-1 text-center font-bold text-lg'>Academic Calendar</h3>
        <div className="startDate">
          <h4 className='font-semibold'>Enter Start Date</h4>
          <div >
            <label className='p-1 m-1' htmlFor="startDate">Start of Semester:</label>
            <input className='p-1 m-1' type="date" id="startDate" name="startDate" value={dates.startDate} onChange={(e)=>changeHandler(e)} />
          </div>
        </div>
        <div className="endDate">
          <h4 className='font-semibold'>Enter End Date</h4>
          <div >
            <label className='p-1 m-1' htmlFor="endDate">End of Semester:</label>
            <input className='p-1 m-1' type="date" id="endDate" name="endDate" value={dates.endDate} onChange={(e)=>changeHandler(e)} />
          </div>
        </div>
        <div className='button1 cursor-pointer mt-4' onClick={()=>HandleClick()}>Submit</div>
      </div>
      {/* <div className="addHolidayInCalender w-1/2 border-2 border-red-600">
        hello
      </div> */}
    </div>
  )
}
