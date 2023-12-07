import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const initialState={
    value:false,
    isErr:false,
    errMsg:"",
}

export const changepassasync = createAsyncThunk('changePassword/changepassasync', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post('api/student/changepassword', {
            currentPassword: payload.currentpassword,
            newPassword: payload.password
        });

        const msg = response.data.message;
                
        if (msg === 'Password changed successfully') {
           
            
             return msg
        }

        // Return undefined or an error object if the authentication fails
        return rejectWithValue(msg);
    } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
    }
});

export const passwordslice = createSlice(
    {
        name: 'changePassword',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(changepassasync.fulfilled, (state, action) => {
    
                    state.value = true;
                  
                    
                })
                .addCase(changepassasync.rejected, (state, action) => {
    
                    state.isErr = true;
                    state.errMsg =  'something went wrong';
                })
            },
    }
)

export const { changepassword } = passwordslice.actions;

export default passwordslice.reducer;