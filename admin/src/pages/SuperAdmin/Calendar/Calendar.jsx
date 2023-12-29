import React, { useEffect, useImperativeHandle, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAcademicAsync, fetchAcademicAsync, updateHolidayAsync } from '../../../redux-toolkit/slices/academicCalenderslice'
import './Calendar.css'

const semDate = {
  startDate: '',
  endDate: '',
}

const holidayDetail = {
  Date: '',
  holiday: true,
  event: '',
}

const rescheduledDay = {
  date: '',
  day:'',
}





export default function Calendar() {
  const [dates, setDates] = useState(semDate)
  const [holiday , setHoliday] = useState(holidayDetail)
  const [rescheduled, setRescheduled] = useState(rescheduledDay);
  // below option is for conversion of date from "2024-01-01T00:00:00.000Z" to " 1 jan 2024 "
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  
  const weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

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
  const HolidaychangeHandler = (e) => {
    setHoliday(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
    console.log(holiday)
  }

  const rescheduleDayChangeHandler = (e) => {
    setRescheduled(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const CreateSemester = () => {

    ; (async () => {
      try {
        await dispatch(createAcademicAsync({ ...dates }));

      } catch (error) {
        console.log(error);
      }
    })()

  }

  const UpdateHoliday = () => {
console.log("updateHoliday")
    ; (async () => {
      try {
        await dispatch(updateHolidayAsync({ ...holiday }));
       
      } catch (error) {
        console.log(error);
      }
    })()
    
  }

  // reschedule form submit
  const rescheduleSubmit = () => {
console.log("rescheduleSubmit")
    // ; (async () => {
    //   try {
    //     await dispatch(updateHolidayAsync({ ...holiday }));
       
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })()
    
  }


  useEffect(() => {
    const unsub=async()=>{
      try{

        await dispatch(fetchAcademicAsync());

      }catch(error){
          console.log(error);
      }
    }
   
    unsub();
   }, [])

   const convertDate = (inputDate)=>{
    const dateObj = new Date(inputDate);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    return formattedDate
   }
  
  const fetchcalendar=useSelector((state)=>state.academicCalender.detail)
  
  const [calender,setCalender] = useState([...fetchcalendar])

  useEffect(()=>{
     setCalender( calender.sort((a, b) => new Date(a.date) - new Date(b.date)))
     console.log(fetchcalendar)
    console.log(calender)
  },[fetchcalendar])

  return (
    <div className='flex justify-center w-full flex-col bg-dimWhite'>
      {/* Semester start-end Form  */}
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
          <div className='button1 cursor-pointer mt-4 w-fit self-center' onClick={() => CreateSemester()}>Submit</div>
        </div>
        {/* add holiday form */}
        <div>
          <h3 className='m-1 p-1 text-center font-bold text-lg'>Add Holiday</h3>
          <div className="holidayDate">
            <div >
              <label className='p-1 m-1' htmlFor="Date">Holiday Date:</label>
              <input className='p-1 m-1' type="date" id="Date" name="Date" value={holiday.Date} onChange={(e) => HolidaychangeHandler(e)} />
            </div>
            <div>
              <label className='p-1 m-1' for="holiday">Holiday name:</label>
              <input className='p-1 m-1 border-2 border-gray-600 rounded' type="text" id="event" name="event" value={holiday.event} onChange={(e) => HolidaychangeHandler(e)} />
            </div>
          </div>
          <div className='button1 cursor-pointer mt-4 w-fit self-center' onClick={() => UpdateHoliday()}>Submit</div>
        </div>
        {/* rescheduled form */}
        <div>
          <h3 className='m-1 p-1 text-center font-bold text-lg'>Reschedule Date</h3>
          <div className="holidayDate">
            <div >
              <label className='p-1 m-1' htmlFor="date"> Date:</label>
              <input className='p-1 m-1' type="date" id="date" name="date" value={rescheduled.date} onChange={(e) => rescheduleDayChangeHandler(e)} />
            </div>
            <div>
              <label className='p-1 m-1' for="day"> Day: </label>
              <select className='p-1 m-1 border-2 border-gray-600 rounded' name="day" id="day" value={rescheduled.day} onChange={(e) => rescheduleDayChangeHandler(e)}>
                <option value={null}>Add Day</option>
                {
                  weekday.map(day=>{
                    return(
                      <option key={day} value={day}>{day}</option>
                    )
                  })
                }
              </select>
              {/* <input className='p-1 m-1 border-2 border-gray-600 rounded' type="text" id="day" name="day" value={rescheduled.day} onChange={(e) => rescheduleDayChangeHandler(e)} /> */}
            </div>
          </div>
          <div className='button1 cursor-pointer mt-4 w-fit self-center' onClick={() => rescheduleSubmit()}>Submit</div>
        </div>
      </div>
      {/* calender  */}
      <div className="addHolidayInCalender">        
          {
            calender&&
            calender.map( Date =>{
              return(
                <div key={Date._id} className="dateRelatedData rounded">                 
                  <h4> {convertDate(Date.date)} </h4>
                  <h4>{Date.day}</h4>
                  {
                    Date.event=="No event"?<></>:<h4>{Date.event}</h4>
                  }
                </div>
              )
            })
          }
       
       
        {/* <div className="dateRelatedData rounded">
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
        </div> */}
      </div>
    </div>
  )
}
