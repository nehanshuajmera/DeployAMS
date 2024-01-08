import React, { useEffect, useImperativeHandle, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAcademicAsync, fetchAcademicAsync, updateHolidayAsync } from '../../../redux-toolkit/slices/academicCalenderslice'
import './Calendar.css'
import UpdateHolidayForm from './UpdateHolidayForm'
import UpdateDayForm from './UpdateDayForm'
import AddMoreDaysForm from './AddMoreDaysForm'
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
  day: '',
}

export default function Calendar() {
  const [dates, setDates] = useState(semDate)
  const [holiday, setHoliday] = useState(holidayDetail)
  const [rescheduled, setRescheduled] = useState(rescheduledDay);
  // below option is for conversion of date from "2024-01-01T00:00:00.000Z" to " 1 jan 2024 "
  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

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
    const unsub = async () => {
      try {

        await dispatch(fetchAcademicAsync());

      } catch (error) {
        console.log(error);
      }
    }

    unsub();
  }, [])

  const convertDate = (inputDate) => {
    const dateObj = new Date(inputDate);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    return formattedDate
  }

  const fetchcalendar = useSelector((state) => state.academicCalender.detail)

  const [calender, setCalender] = useState([...fetchcalendar])

  useEffect(() => {
    //  setCalender( calender.sort((a, b) => new Date(a.date) - new Date(b.date)))
    //  console.log(fetchcalendar)
    setCalender(fetchcalendar)
    // console.log(calender)
  }, [fetchcalendar])

  return (
    <div className='flex justify-center w-full flex-col bg-dimWhite'>
      {/* Semester start-end Form  */}
      <div className="addDateSide flex p-1 justify-center items-center">
        <div className="w-1/3 m-10 p-4 flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
          <h3 className="m-1 p-1 text-center font-bold text-lg">Academic Calendar</h3>

          {fetchcalendar.length > 0 ? <div className="flex items-center justify-center m-2">
            <div className="p-2 m-1 text-white bg-blue-500 rounded">Start Date: {convertDate(fetchcalendar[0]?.date)}</div>
            <div className="p-2 m-1 text-white bg-blue-500 rounded">End Date: {convertDate(fetchcalendar[fetchcalendar.length - 1]?.date)}</div>
          </div> :
            <>
              <div className="startDate mt-4">
                <h4 className="font-semibold text-lg">Enter Start Date</h4>
                <div className="flex items-center">
                  <label className="p-1 m-1" htmlFor="startDate">Start of Semester:</label>
                  <input className="p-1 m-1 border rounded" type="date" id="startDate" name="startDate" value={dates.startDate} onChange={(e) => changeHandler(e)} />
                </div>
              </div>

              <div className="endDate mt-4">
                <h4 className="font-semibold text-lg">Enter End Date</h4>
                <div className="flex items-center">
                  <label className="p-1 m-1" htmlFor="endDate">End of Semester:</label>
                  <input className="p-1 m-1 border rounded" type="date" id="endDate" name="endDate" value={dates.endDate} onChange={(e) => changeHandler(e)} />
                </div>
              </div>

              <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer" onClick={() => CreateSemester()}>Submit</button>
            </>
          }
        </div>
        {/* add holiday form */}
        <div className='mx-7'>
          <UpdateHolidayForm />
        </div>
        {/* rescheduled form */}
        <div>
          <UpdateDayForm />
        </div>
        <div className='mx-7'>
          <AddMoreDaysForm />
        </div>
      </div>
      {/* calender  */}
      <div className="addHolidayInCalender">
        {
          calender &&
          calender.map(Date => {
            return (
              <div key={Date._id} className={Date.holiday ? "dateRelatedData rounded bg-red-500 " : "dateRelatedData rounded"}>
                <h4> {convertDate(Date.date)} </h4>
                <h4>{Date.day}</h4>
                {
                  Date.event == "No event" ? <></> : <h4>{Date.event}</h4>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
