import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// use the api for fetching the following request allstudents, allteachers, allsubjects , viewallrequest,allcomplaints  syntax for fetching  follow the below comment
/* 
import { useDispatch, useSelector } from 'react-redux'; //these are hooks
import { fetchdetailasync } from '../../../redux-toolkit/slices/fetchdetailslice';  // include this file before dispatching action through this file
            const dispatch=useDispatch();
  
  useEffect(() => {
    const unsub=async()=>{
      try{

        await dispatch(fetchdetailasync({apiname:"/allstudents"}));

      }catch(error){
          console.log(error);
      }
    }
   
    unsub();
   }, [])
  
  const dataofstudent=useSelector((state)=>state.fetchDetail);
  console.log(dataofstudent);
*/
const initialState={
    value:false,
    isErr:false,
    errMsg:"",
    details:[],
}

export const fetchdetailasync = createAsyncThunk('fetchDetail/fetchdetailasync', async (payload, { rejectWithValue }) => {
    try {
        console.log(payload);
        // if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
        // {
            const response = await axios.get('/api/admin/'+payload.apiname);
            const msg = response.data.message;

              if(response.status===200)      
            return msg;
            
            
            // Return undefined or an error object if the authentication fails
            return rejectWithValue(msg);
        // }
    } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
    }
});

export const fetchdetailslice = createSlice(
    {
        name: 'fetchDetail',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchdetailasync.fulfilled, (state, action) => {
    
                    state.value = true;
                    state.details=action.payload;
                })
                .addCase(fetchdetailasync.rejected, (state, action) => {
                    state.isErr = true;
                    state.errMsg =  action.payload
                })
            },
    }
)

export const { fetchDetail } = fetchdetailslice.actions;

export default fetchdetailslice.reducer;