import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    value:false,
    isErr:false,
    errMsg:"",
    details:"",
}

export const changepassasync = createAsyncThunk('changePassword/changepassasync', async (payload, { rejectWithValue }) => {
    try {
        if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
        {
            const response = await axios.get('api/student/details');
            const msg = response.data.message;
            
              if(msg !=="Unauthorized" ||msg !=="User not found" || msg !=="Forbidden: Access denied for non-student users")      
            return msg;
            
            
            // Return undefined or an error object if the authentication fails
            return rejectWithValue(msg);
        }
    } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
    }
});

export const passwordslice = createSlice(
    {
        name: 'studentDetail',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(changepassasync.fulfilled, (state, action) => {
    
                    state.value = true;
                    state.details=action.payload;
                })
                .addCase(changepassasync.rejected, (state, action) => {
                    state.isErr = true;
                    state.errMsg =  action.payload
                })
            },
    }
)

export const { changepassword } = passwordslice.actions;

export default passwordslice.reducer;