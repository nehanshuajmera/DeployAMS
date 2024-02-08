import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  change: false,
  isErr: false,
  errMsg: "",
  message: "",
}

export const createSubjectAsync = createAsyncThunk('subjectCRUD/createSubjectAsync', async (payload, { rejectWithValue }) => {
  try {
    console.log(payload);
    // if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
    // {
    const response = await axios.post('/api/admin/createsubject', payload);
    const msg = response.data.message;

    if (response.status === 200)
      return msg;

    // Return undefined or an error object if the request fails
    return rejectWithValue(msg);
    // }
  } catch (error) {
    // Return undefined or an error object if an error occurs
    return rejectWithValue(error.message);
  }
});

export const changeSubjectTimetableAsync = createAsyncThunk('subjectCRUD/changeSubjectTimetableAsync', async (payload, { rejectWithValue }) => {
  try {
    console.log(payload);
    // if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
    // {
    const response = await axios.post(`/api/admin/changesubjecttimetable/${payload.ID}`, payload.data);
    const msg = response.data.message;

    if (response.status === 200)
      return msg;

    // Return undefined or an error object if the request fails
    return rejectWithValue(msg);
    // }
  } catch (error) {
    // Return undefined or an error object if an error occurs
    return rejectWithValue(error.message);
  }
});

export const updateSubjectAsync = createAsyncThunk('subjectCRUD/updateSubjectAsync', async (payload, { rejectWithValue }) => {
  try {
    console.log(payload);
    // if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
    // {
    const response = await axios.post(`/api/admin/updatesubject/${payload.ID}`, payload.data);
    const msg = response.data.message;

    if (response.status === 200)
      return msg;

    // Return undefined or an error object if the request fails
    return rejectWithValue(msg);
    // }
  } catch (error) {
    // Return undefined or an error object if an error occurs
    return rejectWithValue(error.message);
  }
});

export const extraLectureAsync = createAsyncThunk('subjectCRUD/extraLectureAsync', async (payload, { rejectWithValue }) => {
  try {
    console.log(payload);
    // if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
    // {
        const response = await axios.post(`/api/admin/extralecture/${payload.ID}`, payload.data);
    const msg = response.data.message;

    if (response.status === 200)
      return msg;

    // Return undefined or an error object if the request fails
    return rejectWithValue(msg);
    // }
  } catch (error) {
    // Return undefined or an error object if an error occurs
    return rejectWithValue(error.message);
  }
});
export const deleteSubjectAsync = createAsyncThunk('subjectCRUD/deleteSubjectAsync', async (subjectId, { rejectWithValue }) => {
  try {
      // if(JSON.parse(localStorage.getItem('reduxState')).isAuthenticated === true)
      // {
          const response = await axios.delete(`/api/admin/deletesubject/${subjectId}`);
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
export const crudSubjectsSlice = createSlice(
  {
    name: 'subjectCRUD',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createSubjectAsync.fulfilled, (state, action) => {
          state={...initialState}
          state.change = true;
          state.message = action.payload;
        })
        .addCase(createSubjectAsync.rejected, (state, action) => {
          state.isErr = true;
          state.errMsg = action.payload;
        })
        .addCase(changeSubjectTimetableAsync.fulfilled, (state, action) => {
          state={...initialState}
          state.change = true;
          state.message = action.payload;
        })
        .addCase(changeSubjectTimetableAsync.rejected, (state, action) => {
          state.isErr = true;
          state.errMsg = action.payload;
        })
        .addCase(updateSubjectAsync.fulfilled, (state, action) => {
          state={...initialState}
          state.change = true;
          state.message = action.payload;
        })
        .addCase(updateSubjectAsync.rejected, (state, action) => {
          
          state.isErr = true;
          state.errMsg = action.payload;
        })
        .addCase(extraLectureAsync.fulfilled, (state, action) => {
          state={...initialState}
          state.change = true;
          state.message = action.payload;
        })
        .addCase(extraLectureAsync.rejected, (state, action) => {
          state.isErr = true;
          state.errMsg = action.payload;
        })
        .addCase(deleteSubjectAsync.fulfilled, (state, action) => {
          state={...initialState}
          state.change = true;
          state.message = action.payload;
        })
        .addCase(deleteSubjectAsync.rejected, (state, action) => {
          state.isErr = true;
          state.errMsg = action.payload;
        });;
    },
  }
);

export const { subjectCRUD } = crudSubjectsSlice.actions;

export default crudSubjectsSlice.reducer;
