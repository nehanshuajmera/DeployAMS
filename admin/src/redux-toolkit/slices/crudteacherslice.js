import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState={
    change:false,
    isErr:false,
    errMsg:"",
    message:"",
}

export const createTeacherAsync = createAsyncThunk('teacherCRUD/createTeacherAsync', async (payload, { rejectWithValue }) => {
    try {
        console.log(payload);
        // if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
        // {
            const response = await axios.post('/api/admin/createteacher', payload);
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

export const updateTeacherAsync = createAsyncThunk('teacherCRUD/updateTeacherAsync', async (payload, { rejectWithValue }) => {
    try {
        console.log(payload);
        // if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
        // {
            const response = await axios.post(`/api/admin/updateteacher/${payload.ID}`, payload.data);
            // pass payload data as JSON format { id: "fghveuhfu", data: {updation data in JSON format}}
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

// ... (rest of your code)

export const deleteTeacherAsync = createAsyncThunk('teacherCRUD/deleteTeacherAsync', async (teacherId, { rejectWithValue }) => {
    try {
        // if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
        // {
            const response = await axios.get(`/api/admin/deleteteacher/${teacherId}`);
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

// ... (rest of your code)

export const crudTeacherSlice = createSlice({
    name: 'teacherCRUD',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTeacherAsync.fulfilled, (state, action) => {
                state={...initialState}
                state.change = true;
                state.message = action.payload;
            })
            .addCase(createTeacherAsync.rejected, (state, action) => {
                state.isErr = true;
                state.errMsg =  action.payload;
            })
            .addCase(updateTeacherAsync.fulfilled, (state, action) => {
                state={...initialState}
                state.change = true;
                state.message = action.payload;
            })
            .addCase(updateTeacherAsync.rejected, (state, action) => {
                state.isErr = true;
                state.errMsg =  action.payload;
            })
            .addCase(deleteTeacherAsync.fulfilled, (state, action) => {
                state={...initialState}
                state.change = true;
                state.message = action.payload;
            })
            .addCase(deleteTeacherAsync.rejected, (state, action) => {
                state.isErr = true;
                state.errMsg =  action.payload;
            });
    },
});

export const { teacherCRUD } = crudTeacherSlice.actions;

export default crudTeacherSlice.reducer;
