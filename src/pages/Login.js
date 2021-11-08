import { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { useUserContext } from "../hooks/UserContext";

function Login() {
  const { user, setUser } = useUserContext();
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
      .then(res => {
        if (!res.ok) {
          res.json().then(json => {
            console.log(json.message);
          })
        } else {
          return res.json().then(user => {
            setUser(user);
            //TODO naviger user til boards istedet
            console.log(user);
          });
        }
      });
  }

  return (
    <div id="Login">
      <div className="login-con">
          <h1>Login</h1>
          <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={onLogin}>Login</button>
          <p>Dont have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login;