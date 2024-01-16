import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const storedState = JSON.parse(localStorage.getItem('reduxState'));
const initialState = {
    isLogin: false,
    isAuthenticated: false,
    iserror: false,
    usertype: '',
    errmsg: '',
    
};

// Async thunk for login
export const loginAsync = createAsyncThunk('login/loginAsync', async (payload, { rejectWithValue }) => {
    try {
      
        
        const response = await axios.post('/api/student/login', {
            enrollment_no: payload.userId,
            password: payload.password,
        });
            
        const msg = response.data.message;

        if (msg === 'Authentication successful') {
            window.location.reload();
            const authResponse = await axios.get('/api/authentic');
                
            if (authResponse.data.message === 'student') {
                return authResponse.data.message;
            }
            else rejectWithValue(authResponse.data.message);
        }

        // Return undefined or an error object if the authentication fails
        return rejectWithValue(msg);
    } catch (error) {
        // Return undefined or an error object if an error occurs
        return rejectWithValue(error.message);
    }
});

// Async thunk for logout
export const logoutAsync = createAsyncThunk('login/logoutAsync', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/authentic/logout');
       const msg = response.data.message
       
        if (msg === "Logout successful")
        {
            
            return msg
        }


        return rejectWithValue(msg);


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
                return {
                    ...initialState,
                    isLogin: true,
                    isAuthenticated: true,
                    usertype: action.payload,
                };
            })
            .addCase(loginAsync.rejected, (state, action) => {
                return {
                    ...initialState,
                    iserror: true,
                    errmsg: action.payload,
                };
            })
            .addCase(logoutAsync.fulfilled, (state, action) => {
                return { ...initialState };
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                return {
                    ...initialState,
                    iserror: true,
                    errmsg: action.payload,
                };
            })
    },
    
});

export const { login } = loginslice.actions;

export default loginslice.reducer;
