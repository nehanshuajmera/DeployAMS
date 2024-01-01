import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    value: false,
    isErr: false,
    errMsg: "",
    message: "",
}

export const postLeaveTeacherAttendanceAsync = createAsyncThunk('leaveTeacherAttendance/postLeaveTeacherAttendanceAsync', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/teacher/createleaveTeacherAttendance', payload.data);
        const msg = response.data.message;

        if (response.status === 200)
            return msg;

        // Return undefined or an error object if the request fails
        return rejectWithValue(msg);

    } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
    }
});

export const leaveTeacherAttendanceSlice = createSlice({
    name: 'leaveTeacherAttendance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postLeaveTeacherAttendanceAsync.fulfilled, (state, action) => {
                state.value = true;
                state.message = action.payload;
            })
            .addCase(postLeaveTeacherAttendanceAsync.rejected, (state, action) => {
                state.isErr = true;
                state.errMsg = action.payload;
            })
    },
});

export const { leaveTeacherAttendance } = leaveTeacherAttendanceSlice.actions;

export default leaveTeacherAttendanceSlice.reducer;
