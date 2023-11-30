import React, { useContext, useState } from 'react'
import TeacherContext from '../../../context/TeacherContext';
import axios from 'axios';

export default function Alert() {
  const { alerts } = useContext(TeacherContext);
  // console.log(alerts)

  const [newAlert, setnewAlert] = useState({
    title: "",
    alert: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewAlert({
      ...newAlert,
      [name]: value,
    });
  };

  const createalert=()=>{
    console.log("Creating New Alert ",newAlert)
    axios.post("/api/alert/createalert",newAlert).then((res) => {
      // console.log(res.data)
      alerts.push(res.data)
      window.location.reload(false);

    });
  }


  return (
    <div className="flex justify-center flex-row flex-wrap  items-center h-screen" >
      {/* old alerts */}
    <div class="bg-white border border-slate-200 grid grid-cols-6 w-1/4 h-2/4 m-2 gap-2 rounded-xl p-2 text-sm">
        <h1 class="text-center text-slate-500 text-xl font-bold col-span-6 ">Alerts</h1>
        {alerts.map((alert) => {
          return (
            <div class="bg-slate-100 border border-slate-200 col-span-6 rounded-lg p-2 duration-300 hover:border-slate-600">
              <h1 class="text-center text-slate-500 text-xl font-bold col-span-6 ">{alert.title}</h1>
              <p class="text-center text-slate-500 text-xl font-bold col-span-6 ">{alert.alert}</p>
            </div>
          )
        })}
      </div>
      {/* new alert */}

      <div class="bg-white border border-slate-200 grid grid-cols-6 w-2/4 h-2/4  gap-2 rounded-xl p-2 text-sm">
        <h1 class="text-center text-slate-500 text-xl font-bold col-span-6 ">Create Alert</h1>
        <input placeholder="Title" name='title' onChange={handleChange} value={newAlert.title} class="bg-slate-100 text-slate-600 border border-slate-200 col-span-6 rounded-lg p-2 duration-300 focus:border-slate-600" />
        <textarea placeholder="Your Alert Description..." name='alert' value={newAlert.alert}  onChange={handleChange} class="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"></textarea>


        <button onClick={()=>{createalert()}} class="bg-slate-100 stroke-slate-600 border w-50 h-10 border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:text-white focus:stroke-blue-200 focus:bg-blue-400">
        <h1 class="text-center text-slate-500 text-base font-bold col-span-6 ">Alert</h1>
          <svg fill="none" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"></path>
            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M10.11 13.6501L13.69 10.0601"></path>
          </svg>
        </button>

      </div>
    </div>
  )
}