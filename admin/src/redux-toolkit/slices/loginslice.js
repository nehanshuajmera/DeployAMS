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
        const response = await axios.post('api/teacher/login', {
            teacher_id: payload.userId,
            password: payload.password,
        });

        const msg = response.data.message;

        if (response.status === 200) {
            const authResponse = await axios.get('api/authentic');

            if (authResponse.data.message === 'teacher'||authResponse.data.message === 'Admin') {
                return authResponse.data.message;
            }
            return rejectWithValue(authResponse.data.message);
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
            console.log("logout");
            return msg;
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
                state={...initialState}
                state.isLogin = true;
                state.isAuthenticated = true;
                state.usertype = action.payload;
                console.log(state);
               
                
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state={...initialState}
                state.iserror = true;
                
                state.errmsg ="errocurred";
            })
            .addCase(logoutAsync.fulfilled, (state,action) => {
                console.log("seting value");
                        
                state={...initialState}
              
             
            })
            .addCase(logoutAsync.rejected, (state,action) => {
                state.iserror = true,
                    state.errmsg =action.payload;
                    console.error('Logout failed with error:', action.payload);
            })

    },
});

export const { login } = loginslice.actions;
export default loginslice.reducer;
