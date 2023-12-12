import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState={
    change:false,
    isErr:false,
    errMsg:"",
    message:"",
}

export const createStudentasync = createAsyncThunk('studentCRUD/createStudentasync', async (payload, { rejectWithValue }) => {
    try {
        console.log(payload);
        // if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
        // {
            const response = await axios.post('api/admin/createstudent',payload);
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
export const updateStudentasync = createAsyncThunk('studentCRUD/updateStudentasync', async (payload, { rejectWithValue }) => {
    try {
        console.log(payload);
        // if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
        // {
            const response = await axios.post('api/admin/updatestudent/'+ payload.ID,payload.data);
            //pass payload data as json format { id:"fghveuhfu",data:{updation data in json format}}
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
export const deleteTeacherAsync = createAsyncThunk('teacherCRUD/deleteTeacherAsync', async (teacherId, { rejectWithValue }) => {
    try {
        // if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
        // {
            const response = await axios.get(`api/admin/deletstudent/${teacherId}`);
            const msg = response.data.message;
            
            if(response.status === 200)       
                return msg;
            
            // Return undefined or an error object if the request fails
            return rejectWithValue(msg);
        // }
    } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
    }
});
export const crudstudentslice = createSlice(
    {
        name: 'studentCRUD',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(createStudentasync.fulfilled, (state, action) => {
    
                    state.change = true;
                    state.message=action.payload;
                })
                .addCase(createStudentasync.rejected, (state, action) => {
                    state.isErr = true;
                    state.errMsg =  action.payload
                })
                .addCase(updateStudentasync.fulfilled, (state, action) => {
    
                    state.change = true;
                    state.message=action.payload;
                })
                .addCase(updateStudentasync.rejected, (state, action) => {
                    state.isErr = true;
                    state.errMsg =  action.payload
                })
            },
    }
)

export const { studentCRUD } = crudstudentslice.actions;

export default crudstudentslice.reducer;