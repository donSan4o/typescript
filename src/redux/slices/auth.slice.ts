import { createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import { IAuth, IUser } from "../../interfaces";
import { AxiosError } from "axios";
import { authService } from "../../services";
import { IErrorAuth } from '../../interfaces/error.interface';

interface IState {
    error: IErrorAuth;
    me: IUser;
}

const initialState: IState = {
    error: null,
    me: null
}

const register = createAsyncThunk<void, IAuth> (
    'authSlice/register',
    async (user, {rejectWithValue}) => {
        try {
            await authService.register(user)
        } catch (error) {
            const err = error as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const login = createAsyncThunk<IUser, IAuth>(
    'authSlice/login',
    async (user, {rejectWithValue})=> {
        try {
            return await authService.login(user)
        } catch (error) {
            const err = error as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const me = createAsyncThunk<IUser, void>(
    'authSlice/me',
    async () => {
        const {data} = await authService.me()
        return data
    }
)

const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder => 
        builder
        .addMatcher(isFulfilled(), state => {
            state.error = null
        })
        .addMatcher(isFulfilled(login, me), (state, action) => {
            state.me = action.payload
        })
        .addMatcher(isRejectedWithValue(), (state,action)=> {
            state.error = action.payload as IErrorAuth
        })
    
})

const { actions, reducer: authReducer } = slice;

const authActions = {
    ...actions,
    register,
    login,
    me
}

export {
    authActions,
    authReducer
}