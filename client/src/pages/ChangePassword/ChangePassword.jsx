
import React, { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {changepassasync} from '../../redux-toolkit/slicees/passwordslice'
import { logoutAsync } from '../../redux-toolkit/slicees/loginslice';
export default function ChangePassword() {
  const changestate= useSelector((state) => state.changePassword)
  const stateofuser= useSelector((state) => state.login)
  console.log(changestate);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    currentpassword: '',
    newpassword: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      if(formData.newpassword===formData.password)
      dispatch(changepassasync(formData));
    dispatch(logoutAsync());
      navigate("/login");
    console.log('Form submitted with data:', formData);
  }
  
  return (
    <div className='border-2 p-8 border-gray-600 rounded'>
        <form onSubmit={handleSubmit}>
      <div className="relative z-0 w-full mb-6 group">

        <input
          type="password"
          
          id="floating_passw"
          name="currentpassword"
          value={formData.currentpassword}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          onChange={handleChange}
          
          placeholder=" "
          required=""/>
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Old Password
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          name="newpassword"
          value={formData.newpassword}
          id="floating_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          onChange={handleChange}
          placeholder=" "
          required=""/>
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          New Password
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          name="password"
          value={formData.password}
          id="floating_repeat_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          onChange={handleChange}
          placeholder=" "
          required=""/>
        <label
          htmlFor="floating_repeat_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Confirm New password
        </label>
      </div>
      <button
        className="text-gray-600 border-2 gray-600 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 mx-3 text-center">
        Back
      </button>
      <button
        type="submit"
       
        className="text-gray-600 border-2 gray-600 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center">
        Submit
      </button>
          </form>
    </div>
  )
}
