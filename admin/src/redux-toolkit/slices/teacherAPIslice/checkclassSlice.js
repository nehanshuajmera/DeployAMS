import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    value:false,
    isErr:false,
    errMsg:"",
    message:"",
}

export const checkclassasync = createAsyncThunk('checkclass/checkclassasync', async (payload, { rejectWithValue }) => {
    try {
      
        
            const response = await axios.get(`/api/teacher/hasclasstoday/${payload.ID}`);
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

export const checkclassslice = createSlice(
    {
        name: 'checkclass',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(checkclassasync.fulfilled, (state, action) => {
    
                    state.value = true;
                    state.message=action.payload;
                })
                .addCase(checkclassasync.rejected, (state, action) => {
                    state.isErr = true;
                    state.errMsg =  action.payload
                })
            },
    }
)

export const { checkclass } = checkclassslice.actions;

export default checkclassslice.reducer;