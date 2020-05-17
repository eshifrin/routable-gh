import React, {useState} from 'react';

function Login(){
  const [token, setToken] = useState("");
  const error = false;

  return(
    <div className={"Login"}>
      <input onChange={(e) => setToken(e.currentTarget.value)} value={token}/>
      <button>submit</button>
      {error && <div>Error logging in. Please try again</div>}
    </div>
  )
}
