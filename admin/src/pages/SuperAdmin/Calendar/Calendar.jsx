import React from 'react'

export default function Calendar() {
  return (
    <div className='flex justify-center align items-center'>
      <div className="addDateSide flex flex-col p-1 m-2 w-1/3 justify-center items-center">
        <h3 className='m-1 p-1 text-center'>Academic Calendar</h3>
        <div className="startDate">
          <h4>Enter Start Date</h4>
          <form action="/">
            <label className='p-1 m-1' htmlFor="startdate">Start of Semester:</label>
            <input className='p-1 m-1' type="date" id="startdate" name="startdate" />
            <input type="submit" />
          </form>
        </div>
        <div className="endDate">
          <h4>Enter End Date</h4>
          <form action="/action_page.php">
            <label className='p-1 m-1' htmlFor="endDate">End of Semester:</label>
            <input className='p-1 m-1' type="date" id="endDate" name="endDate" />
            <input type="submit" />
          </form>
        </div>
      </div>
      {/* <div className="addHolidayInCalender w-1/2 border-2 border-red-600">
        hello
      </div> */}
    </div>
  )
}
