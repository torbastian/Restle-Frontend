import { useState } from "react";

function Login() {
const [loginUsername, setUsername] = useState("");
const [loginPassword, setPassword] = useState("");

const onLogin = (e) => {
  e.preventDefault();



  const requestLogin = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ username: loginUsername, password: loginPassword })
  };

  fetch(process.env.REACT_APP_API_URL + '/user/login', requestLogin)
    .then(res => {console.log(res)})
    
}

  return (
    <div id="Login">
      <div className="login-con">
          <h1>Login</h1>
          <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={onLogin}>Login</button>
      </div>
    </div>
  )
}

export default Login;