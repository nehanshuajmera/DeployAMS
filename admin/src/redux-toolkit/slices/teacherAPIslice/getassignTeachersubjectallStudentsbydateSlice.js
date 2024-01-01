
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    value: false,
    isErr: false,
    errMsg: "",
    message: "",
}
export const getAssignTeacherSubjectAllStudentsByDateAsync = createAsyncThunk(
    'getassignteachersubjectallstudentsbydate/getAssignTeacherSubjectAllStudentsByDateAsync',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axios.post('/api/teacher/getassignTeachersubjectallStudentsbydate', payload.data);
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

  export const assignTeacherSubjectAllStudentsByDateSlice = createSlice({
    name: 'getassignteachersubjectallstudentsbydate', // Change the name to reflect the updated API
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAssignTeacherSubjectAllStudentsByDateAsync.fulfilled, (state, action) => {
          state.value = true;
          state.message = action.payload;
        })
        .addCase(getAssignTeacherSubjectAllStudentsByDateAsync.rejected, (state, action) => {
          state.isErr = true;
          state.errMsg = action.payload;
        });
    },
  });
  
  export const { assignTeacherSubjectAllStudentsByDate } = assignTeacherSubjectAllStudentsByDateSlice.actions;
  export default assignTeacherSubjectAllStudentsByDateSlice.reducer;
  