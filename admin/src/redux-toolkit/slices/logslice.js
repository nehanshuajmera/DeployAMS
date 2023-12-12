import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    value:false,
    isErr:false,
    errMsg:"",
    details:"",
}

export const logasync = createAsyncThunk('logdetail/logasync', async (payload, { rejectWithValue }) => {
    try {
      
        
            const response = await axios.get('/api/logs');
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

export const logslice = createSlice(
    {
        name: 'logdetail',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(logasync.fulfilled, (state, action) => {
    
                    state.value = true;
                    state.details=action.payload;
                })
                .addCase(logasync.rejected, (state, action) => {
                    state.isErr = true;
                    state.errMsg =  action.payload
                })
            },
    }
)

export const { logdetail } = logslice.actions;

export default logslice.reducer;