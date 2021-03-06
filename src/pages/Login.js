import { useState } from "react";
import { useHistory } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { useUserContext } from "../hooks/UserContext";
import '../styles/Login.scss';

function Login() {
  const { user, setUser } = useUserContext();
  const [loginUsername, setUsername] = useState("");
  const [loginPassword, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState("");

  const history = useHistory();

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
            setFailedLogin("brugernavn eller password er forkært");
            console.log(json.message);
          })
        } else {
          return res.json().then(user => {
            console.log("login user ", user);
            setUser(user);
            history.push('/boards');
            console.log(user);
          });
        }
      });
  }

  return (
    <div id="Login">
      <div className="login-con">
        <form>
          <span className="text-center">Login</span>
          <div className="input-container">
            <input type="text" required="" onChange={(e) => setUsername(e.target.value)} />
            <label>Username</label>
          </div>
          <div className="input-container">
            <input type="password" required="" onChange={(e) => setPassword(e.target.value)} />
            <label>Password</label>
          </div>
          { failedLogin !== null && <p className="errorMessage">{failedLogin}</p>}
          <button type="button" className="btn" onClick={onLogin}>Login</button>
          <Link to="/register"><button type="button" className="btn">Register</button></Link>
          <p>Forgot your password? <Link to="/resetpass">Reset password</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login;