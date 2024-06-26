import './Login.css'
import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { loginAsync } from '../../redux-toolkit/slices/loginslice';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import LoadingPage from '../../components/Lodaing';

const initialState = {
  userId: '',
  password: '',
}

export default function Login() {
  const [loginData, setLoginData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { IsLogin } = useContext(AuthContext);

  useEffect(() => {
    if (IsLogin !== null && IsLogin) {
      navigate('/teacherdashboard');
    }
  }, [IsLogin])

  console.log("flow",IsLogin);

  const userstate = useSelector((state) => { state.login });


  const handleChange =(e) => {
    const { name, value } = e.target;
    setLoginData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    dispatch(loginAsync(loginData));
    navigate('/teacherdashboard');
  };
  // useEffect(() => {
  // console.log(isLogin);
  // }, [isLogin])


  const isError = false;

  if(IsLogin === null)
  {
    return <LoadingPage/>  
  }

  return (
    <div className='loginClass'>
      <form onSubmit={handelsubmit} className="form_main">
        {
          isError &&
          <div className='text-white bg-red-600 my-4 mx-2 px-6 py-4 z-50 rounded-lg'>
            {userstate?.errmsg}
          </div>
        }
        <p className="heading">Teacher Login</p>
        <div className="inputContainer">
          <svg
            className="inputIcon"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="#2e2e2e"
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
          </svg>
          <input
            type="text"
            className="inputField"
            id="username"
            name='userId'
            placeholder="Teacher Id"
            value={loginData.userId}
            onChange={handleChange}/>
        </div>
        <div className="inputContainer">
          <svg
            className="inputIcon"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="#2e2e2e"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          </svg>
          <input
            type="password"
            className="inputField"
            id="password"
            name='password'
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="button"  >Login</button>
        {/* <a className="forgotLink" href="#">
          Forgot your password?
        </a> */}
      </form>

    </div>
  )
}
