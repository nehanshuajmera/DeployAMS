import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    value:false,
    isErr:false,
    errMsg:"",
    details:"",
}

export const ParticularAttendanceasync = createAsyncThunk('ParticularAttendancedetail/ParticularAttendanceasync', async (payload, { rejectWithValue }) => {
    try {
      
        
            const response = await axios.get(`api/teacher/studentsattendance/${payload.ID}`,payload.data);
            const msg = response.data.message;

              if(response.status===200)      
            return msg;
            
            
            // Return undefined or an error object if the authentication fails
            return rejectWithValue(msg);
        
    } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
    }
});

export const ParticularAttendanceslice = createSlice(
    {
        name: 'ParticularAttendancedetail',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(ParticularAttendanceasync.fulfilled, (state, action) => {
    
                    state.value = true;
                    state.details=action.payload;
                })
                .addCase(ParticularAttendanceasync.rejected, (state, action) => {
                    state.isErr = true;
                    state.errMsg =  action.payload
                })
            },
    }
)

export const { ParticularAttendancedetail } = ParticularAttendanceslice.actions;

export default ParticularAttendanceslice.reducer;