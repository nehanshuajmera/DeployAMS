import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    value: false,
    isErr: false,
    errMsg: "",
    message: "",
}

export const updateAttendanceByPermissionAsync = createAsyncThunk('updateattendancebypermission/updateAttendanceByPermissionAsync', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post(`/api/teacher/updateattendancebypermission/${payload.ID}`, payload.data);
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

export const updateAttendanceByPermissionSlice = createSlice({
    name: 'updateattendancebypermission',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateAttendanceByPermissionAsync.fulfilled, (state, action) => {
                state.value = true;
                state.message = action.payload;
            })
            .addCase(updateAttendanceByPermissionAsync.rejected, (state, action) => {
                state.isErr = true;
                state.errMsg = action.payload;
            });
    },
});

export const { updateAttendanceByPermission } = updateAttendanceByPermissionSlice.actions;

export default updateAttendanceByPermissionSlice.reducer;
