
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    value: false,
    isErr: false,
    errMsg: "",
    message: "",
}
export const markleaveattendanceontodayAsync = createAsyncThunk(
    'markleaveattendanceontoday/markleaveattendanceontodayAsync',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axios.post('/api/teacher/markleaveattendanceontoday', payload.data);
        const msg = response.data.message;
  
        if (response.status === 200)
          return msg;
  
        // Return undefined or an error object if the request fails
        return rejectWithValue(msg);
      } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const markleaveattendanceontodaySlice = createSlice({
    name: 'markleaveattendanceontoday',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(markleaveattendanceontodayAsync.fulfilled, (state, action) => {
          state.value = true;
          state.message = action.payload;
        })
        .addCase(markleaveattendanceontodayAsync.rejected, (state, action) => {
          state.isErr = true;
          state.errMsg = action.payload;
        });
    },
  });
  
  export const { markleaveattendanceontoday } = markleaveattendanceontodaySlice.actions;
  
  export default markleaveattendanceontodaySlice.reducer;
  