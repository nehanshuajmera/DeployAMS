import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState={
    change:false,
    isErr:false,
    errMsg:"",
    message:"",
}

export const permissionasync = createAsyncThunk('studentCRUD/permissionasync', async (payload, { rejectWithValue }) => {
    try {
        console.log(payload);
        // if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
        // {
            const response = await axios.post(`api/admin/acceptorreject/ ${payload.ID}`, payload.data);
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

export const permissionslice = createSlice(
    {
        name: 'acceptrejectpermission',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase( permissionasync.fulfilled, (state, action) => {
    
                    state.change = true;
                    state.message=action.payload;
                })
                .addCase( permissionasync.rejected, (state, action) => {
                    state.isErr = true;
                    state.errMsg =  action.payload
                })
            },
    }
)

export const { acceptrejectpermission } =  permissionslice.actions;

export default  permissionslice.reducer;