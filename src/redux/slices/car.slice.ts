import { createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";

import { ICar, IError, IPagination } from "../../interfaces";
import { carService } from "../../services";
import { AxiosError } from "axios";

interface IState {
    cars: ICar[];
    prev: string;
    next: string;
    errors: IError;
    trigger: boolean;
    carForUpdate: ICar;
}

const initialState: IState = {
    cars: [],
    prev: null,
    next: null,
    errors: null,
    carForUpdate: null,
    trigger: false
}

const getAll = createAsyncThunk<IPagination<ICar>, void>(
    'carSlice/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await carService.getAll()
            return data
        } catch (error) {
            const err = error as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const create = createAsyncThunk<void, { car: ICar }>(
    'carSlice/create',
    async ({ car }, { rejectWithValue }) => {
        try {
            await carService.create(car)
        } catch (error) {
            const err = error as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const update = createAsyncThunk<void, { car: ICar, id: number }>(
    'carSlice/update',
    async ({ id, car }, { rejectWithValue }) => {
        try {
            await carService.updateById(id, car)
        } catch (error) {
            const err = error as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const deleteCar = createAsyncThunk<void, { id: number }>(
    'carSlice/delete',
    async ({ id }, { rejectWithValue }) => {
        try {
            await carService.deleteById(id)
        } catch (error) {
            const err = error as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const slice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setCarForUpdate: (state, action) => {
            state.carForUpdate = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const { next, prev, items } = action.payload
                state.cars = items
                state.prev = prev
                state.next = next
            })
            .addCase(update.fulfilled, state => {
                state.carForUpdate = null
            })
            .addMatcher(isFulfilled(), state => {
                state.errors = null
            })
            .addMatcher(isFulfilled(create, update, deleteCar), state => {
                state.trigger = !state.trigger;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload
            })
})

const { reducer: carReducer, actions } = slice;

const carActions = {
    ...actions,
    getAll,
    create,
    update,
    deleteCar
}

export {
    carReducer,
    carActions

}