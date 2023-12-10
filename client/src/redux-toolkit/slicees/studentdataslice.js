import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    value:false,
    isErr:false,
    errMsg:"",
    details:"",
}

export const studentdetailasync = createAsyncThunk('studentDetail/studentdetailasync', async (payload, { rejectWithValue }) => {
    try {
        
            const response = await axios.get('api/student/details');
            const msg = response.data.message;
            
              if(msg !== "Unauthorized" ||msg !== "User not found" || msg !== "Forbidden: Access denied for non-student users")      
            return msg;
            
            
            // Return undefined or an error object if the authentication fails
            return rejectWithValue(msg);
        
    } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
    }
});

export const studentslice = createSlice(
    {
        name: 'studentDetail',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(studentdetailasync.fulfilled, (state, action) => {
    
                    state.value = true;
                    state.details=action.payload;
                })
                .addCase(studentdetailasync.rejected, (state, action) => {
                    state.isErr = true;
                    state.errMsg =  action.payload
                })
            },
    }
)

export const { studentDetail } = studentslice.actions;

export default studentslice.reducer;