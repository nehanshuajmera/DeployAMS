import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    value:false,
    isErr:false,
    errMsg:"",
    details:{
        "created_at_and_by": {
            "timestamp": "2023-12-27T10:10:02.588Z"
        },
        "_id": "658bf7fa8ab9ed91c4011aad",
        "name": "demo stud 1",
        "enrollment_no": "EN20CS306001",
        "scholar_no": "978645",
        "email": "demostudent1@gmail.com",
        "phone_no": "8795461542",
        "programme": "Btech",
        "faculty": "Eng",
        "specialisation": "CSBS",
        "year": 1,
        "branch": "CSE",
        "section": "b",
        "batch": "A",
        "password": "$2b$10$kZlpcPTVdihwZnk5AheWlOVJdLACDzEmEGdRmOgrakZKtJHaNSBr.",
        "subjects": [
            {
                "subject_id": {
                    "_id": "658bf6d88ab9ed91c401170f",
                    "subject_name": "demo subj 1",
                    "course_code": "Democode1",
                    "branch": "CSE",
                    "section": "A",
                    "batch": "B",
                    "day": [
                        {
                            "name": "Monday",
                            "count": 0,
                            "_id": "658bf6d88ab9ed91c4011710"
                        },
                        {
                            "name": "Wednesday",
                            "count": 2,
                            "_id": "658bf6d88ab9ed91c4011711"
                        },
                        {
                            "name": "Thursday",
                            "count": 1,
                            "_id": "658bf6d88ab9ed91c4011712"
                        }
                    ],
                    "lecture_dates": [
                       
                    ],
                    "lecture_dates": [
                       
                    ],
                    "updateAttendance": [],
                    "extraClass": [],
                    "rescheduleClass": [],
                    "__v": 0,
                    "teacher_id": "658bf74c8ab9ed91c401184a"
                },
                "_id": "658bf7fa8ab9ed91c4011aaf",
                "attendance": []
            }
        ],
        "updated_at": "2023-12-27T10:10:02.588Z",
        "ratings": [],
        "__v": 0
    },
}

export const studentdetailasync = createAsyncThunk('studentDetail/studentdetailasync', async (payload, { rejectWithValue }) => {
    try {
        
            const response = await axios.get('api/student/details');
            const msg = response.data.message;
            // console.log(msg)
            //   if(msg !== "Unauthorized" ||msg !== "User not found" || msg !== "Forbidden: Access denied for non-student users")      
            return msg;
            
            
            // Return undefined or an error object if the authentication fails
            return rejectWithValue(msg);
        
    } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
    }
});

export const studentslice = createSlice(
    {
        name: 'studentDetail',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(studentdetailasync.fulfilled, (state, action) => {
    
                    state.value = true;
                    state.details=action.payload;
                })
                .addCase(studentdetailasync.rejected, (state, action) => {
                    state.isErr = true;
                    state.errMsg =  action.payload
                })
            },
    }
)

export const { studentDetail } = studentslice.actions;

export default studentslice.reducer;