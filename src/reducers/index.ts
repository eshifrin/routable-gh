import { createSlice, combineReducers } from "@reduxjs/toolkit";
import githubReducer from "./github";

interface Counter {
  count: number;
}

let initialState: Counter = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count++;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  github: githubReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
