import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Navigate, useNavigate ,useLocation} from 'react-router-dom';
import { authasync } from '../redux-toolkit/slices/authapislice';



export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const {value,isErr,errMsg,details}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();
  
  const {isLogin}=useSelector((state)=>state.login)
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(authasync());
        console.log(isLogin, value);
        if (isLogin === false || value === false) {
          navigate('/'); // Redirect to the login page if not logged in
        }
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching authentication status:', error);
      }
    };
  
    fetchData();
    
  }, []);

  return children; //Render the protected content if logged in
}
