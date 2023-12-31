import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const storedState = JSON.parse(localStorage.getItem('reduxState'));
const initialState = {
    iscreated: false,
    value: false,
    iserror: false,
    errmsg: '',
    detail:''
   
};

// Async thunk for creating
export const createAcademicAsync = createAsyncThunk('AcademicCalender/createAcademicAsync', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/calander/create-academic-calendar', {
            startDate:payload.startDate,
            endDate:payload.endDate
        });

        const msg = response.data.message;

      

            if (msg !== "Academic calendar already created" || msg !== "Start date must be before end date"||msg !== "Start date and end date are required") {
                return msg;
            
        }
// Return undefined or an error object if the authentication fails
        return rejectWithValue(msg);
    } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
    }
});
// Async thunk for updating holiday
export const updateHolidayAsync = createAsyncThunk('AcademicCalender/updateHolidayAsync', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/calander/create-academic-calendar', {
            date:payload.date,
            holiday:payload.holiday,
            event:payload.event
        });

        const msg = response.data.message;

      

            if (msg === 'Academic calendar updated to mark the date as a holiday' ) {
                return msg;
            
        }
// Return undefined or an error object if the authentication fails
        return rejectWithValue(msg);
    } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
    }
});
// Async thunk for fetchingacademic calender
export const fetchAcademicAsync = createAsyncThunk('AcademicCalender/fetchAcademicAsync', async (payload, { rejectWithValue }) => {
    try {

        const response = await axios.get('/api/calander/academiccalendar');
       const msg = response.data.message
        
        if (msg !== 'No academic calendar entries found')
        {
            
            return msg;
        }


        return rejectWithValue(msg);


    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const academicCalenderslice = createSlice({
    name: 'AcademicCalender',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAcademicAsync.fulfilled, (state, action) => {
                state.iscreated = true;
                
                
            })
            .addCase(createAcademicAsync.rejected, (state, action) => {

                state.iserror = true;
               
                state.errmsg =action.payload;
            })
            .addCase(updateHolidayAsync.fulfilled, (state,action) => {
                        
                state.value=true;
                 state.detail=action.payload;
              
             })
             .addCase(updateHolidayAsync.rejected, (state,action) => {
                 state.iserror = true,
                     state.errmsg =action.payload;
                     
             })
            .addCase(fetchAcademicAsync.fulfilled, (state,action) => {
                        
               state.value=true;
                state.detail=action.payload;
             
            })
            .addCase(fetchAcademicAsync.rejected, (state,action) => {
                state.iserror = true,
                    state.errmsg =action.payload;
                    
            })

    },
});

export const { academicCalender } = academicCalenderslice.actions;

export default academicCalenderslice.reducer;
