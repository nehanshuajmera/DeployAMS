import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    value:false,
    isErr:false,
    errMsg:"",
    details:"",
}

export const authasync = createAsyncThunk('auth/authasync', async (payload, { rejectWithValue }) => {
    try {
        console.log(payload);
        
        const response = await axios.get('api/authentic');
            const msg = response.data.message;

              if(response.status===200)      
            return msg;
            
     
            return rejectWithValue(msg);

    } catch (error) {
     
        return rejectWithValue(error.message);
    }
});

export const authslice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(authasync.fulfilled, (state, action) => {
    
                    state.value = true;
                    state.details=action.payload;
                    state.isErr = false;
                    state.errMsg =  "";
                })
                .addCase(authasync.rejected, (state, action) => {
                    state.isErr = true;
                    state.errMsg =  action.payload;
                    state.value = false;
                    state.details="";
                })
            },
    }
)

export const { auth } = authslice.actions;

export default authslice.reducer;