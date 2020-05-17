import { createSlice, combineReducers } from '@reduxjs/toolkit'

interface Counter {
  count: number
}

let initialState: Counter = {
  count: 0
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state){ state.count++ },
    decrement(state) { state.count++ }
  }
});

export const { increment, decrement } = counterSlice.actions;

const rootReducer = combineReducers({
  counter: counterSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
