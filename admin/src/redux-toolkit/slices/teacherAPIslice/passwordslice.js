import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    value: false,
    isErr: false,
    errMsg: "",
    message: "",
}

export const changePasswordAsync = createAsyncThunk('password/changePasswordAsync', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post('api/teacher/changepassword', payload);
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

export const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changePasswordAsync.fulfilled, (state, action) => {
                state.value = true;
                state.message = action.payload;
            })
            .addCase(changePasswordAsync.rejected, (state, action) => {
                state.isErr = true;
                state.errMsg = action.payload;
            });
    },
});

export const { password } = passwordSlice.actions;

export default passwordSlice.reducer;
