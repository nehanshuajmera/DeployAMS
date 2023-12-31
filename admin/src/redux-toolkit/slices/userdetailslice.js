import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    value:false,
    isErr:false,
    errMsg:"",
    details:"",
}

export const userdetailasync = createAsyncThunk('userDetail/detailasync', async (payload, { rejectWithValue }) => {
    try {
        
            const response = await axios.get('/api/teacher/details');
            const msg = response.data.message;
            
            if(response.status === 200)      
            return msg;
            
            // Return undefined or an error object if the authentication fails
            return rejectWithValue(msg);
    } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
    }
});

export const userdetailslice = createSlice(
    {
        name: 'userDetail',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(userdetailasync.fulfilled, (state, action) => {
    
                    state.value = true;
                    state.details=action.payload;
                })
                .addCase(userdetailasync.rejected, (state, action) => {
                    state.isErr = true;
                    state.errMsg =  action.payload
                })
            },
    }
)

export const { userDetail } = userdetailslice.actions;

export default userdetailslice.reducer;