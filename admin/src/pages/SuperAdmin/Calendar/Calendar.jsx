import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAcademicAsync } from '../../../redux-toolkit/slices/academicCalenderslice'
import './Calendar.css'

const semDate = {
  startDate: '',
  endDate: '',
}

export default function Calendar() {
  const [dates, setDates] = useState(semDate)
  const dispatch = useDispatch()

  const changeHandler = (e) => {
    setDates(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
    console.log(dates)
  }

  const HandleClick = () => {

    ; (async () => {
      try {
        await dispatch(createAcademicAsync({ ...dates }));

      } catch (error) {
        console.log(error);
      }
    })()

  }

  return (
    <div className='flex justify-center w-full flex-col bg-dimWhite'>
      {/* Semister start-end Form  */}
      <div className="addDateSide flex p-1 justify-center items-center">
        <div className='w-1/3 m-10 p-4 flex flex-col items-center justify-center'>
          <h3 className='m-1 p-1 text-center font-bold text-lg'>Academic Calendar</h3>
          <div className='flex items-center justify-center m-2'>
            <div className='p-2 m-1 bg-black text-red-500 rounded'>Start Date: 22/01/2024</div>
            <div className='p-2 m-1 bg-black text-red-500 rounded'>End Date: 22/04/2024</div>
          </div>
          <div className="startDate">
            <h4 className='font-semibold'>Enter Start Date</h4>
            <div >
              <label className='p-1 m-1' htmlFor="startDate">Start of Semester:</label>
              <input className='p-1 m-1' type="date" id="startDate" name="startDate" value={dates.startDate} onChange={(e) => changeHandler(e)} />
            </div>
          </div>
          <div className="endDate">
            <h4 className='font-semibold'>Enter End Date</h4>
            <div >
              <label className='p-1 m-1' htmlFor="endDate">End of Semester:</label>
              <input className='p-1 m-1' type="date" id="endDate" name="endDate" value={dates.endDate} onChange={(e) => changeHandler(e)} />
            </div>
          </div>
          <div className='button1 cursor-pointer mt-4 w-fit self-center' onClick={() => HandleClick()}>Submit</div>
        </div>
        <div>
          <h3 className='m-1 p-1 text-center font-bold text-lg'>Add Holiday</h3>
          <div className="holidayDate">
            <div >
              <label className='p-1 m-1' htmlFor="startDate">Holiday Date:</label>
              <input className='p-1 m-1' type="date" id="startDate" name="startDate" value={dates.startDate} onChange={(e) => changeHandler(e)} />
            </div>
            <div>
              <label className='p-1 m-1' for="holiday">Holiday name:</label>
              <input className='p-1 m-1 border-2 border-gray-600 rounded' type="text" id="holiday" name="holiday"></input>
            </div>
          </div>
          <div className='button1 cursor-pointer mt-4 w-fit self-center' onClick={() => HandleClick()}>Submit</div>
        </div>
      </div>
      <div className="addHolidayInCalender">
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
        <div className="dateRelatedData rounded">
          <h4>Date</h4>
          <h4>Day</h4>
          <h4>Name Of Holiday</h4>
        </div>
      </div>
    </div>
  )
}
