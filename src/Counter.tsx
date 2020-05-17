import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { increment, decrement, RootState } from './reducers/index';

const ToDoList = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.count);

  return (
    <div className="containers">
      <div>{`Counter: ${count}`}</div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
};

export default ToDoList;


