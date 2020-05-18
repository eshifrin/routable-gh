import React, {useState} from 'react';
import {fetchRepos, LoginState} from '../reducers/github';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../reducers";


function Login(){
  const [token, setToken] = useState("");
  const loginState = useSelector((state: RootState) => state.github.loginState);

  const dispatch = useDispatch();
  function onSubmit() {
    dispatch(fetchRepos(token));
  }

  return(
    <div className={"Login"}>
      <input onChange={(e) => setToken(e.currentTarget.value)} value={token}/>
      <button onClick={onSubmit}>submit</button>
      {loginState}
      {loginState === LoginState.LoggedInError && <div>Error logging in. Please try again</div>}
    </div>
  )
}

export default Login;
