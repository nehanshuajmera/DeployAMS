import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLogin: false,
    isAuthenticated: false,
    iserror: false,
    usertype: '',
    errmsg: '',
    enrollment_no: '',
};

// Async thunk for login
export const loginAsync = createAsyncThunk('login/loginAsync', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post('api/student/login', {
            enrollment_no: payload.userId,
            password: payload.password,
        });

        const msg = response.data.message;

        if (msg === 'Authentication successful') {
            const authResponse = await axios.get('api/authentic');

            if (authResponse.data.message === 'student') {
                return {
                    enrollment_no: payload.userId,
                    usertype: authResponse.data.message,
                };
            }
        }

        // Return undefined or an error object if the authentication fails
        return rejectWithValue(msg);
    } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
    }
});

// Async thunk for logout
export const logoutAsync = createAsyncThunk('login/logoutAsync', async ( payload,{ rejectWithValue }) => {
    try {
        
        const response = await axios.get('/api/authentic/logout');
        return msg=response.data.message
      
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const loginslice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {

                state.isLogin = true;
                state.isAuthenticated = true;
                state.enrollment_no = action.payload.enrollment_no;
                state.usertype = action.payload.usertype;
            })
            .addCase(loginAsync.rejected, (state, action) => {

                state.iserror = true;
                state.errmsg = action.payload || 'Authentication error';
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state = initialState; // Reset state to initial values on logout
              })
              
    },
});

export const { login } = loginslice.actions;

export default loginslice.reducer;
