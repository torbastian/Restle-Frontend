import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { useUserContext } from "../hooks/UserContext";
import '../styles/ResetPassword.scss';

function Reset() {
    useEffect(() => {
        getToken();
    }, []);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {token} = useParams();
  const [ok, setOK] = useState(false);

  function getToken(){
    if(token){
        const requestLogin = {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({ token: token})
          };
        
          fetch(process.env.REACT_APP_API_URL + '/user/checkToken', requestLogin).then((res) =>{
            console.log("fetching getToken");
            setOK(res.ok);
          });
      }
  }

function onReset(_password, _confirmPassword) {
  //checkToken

  if(_password == _confirmPassword){
    const requestLogin = {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ token: token, password:_password })
      };
    
      fetch(process.env.REACT_APP_API_URL + '/user/PasswordReset', requestLogin);
      history.push("/login");
  }
}
  
if(!ok){
    return (<div>Access denied</div>)
}else{
    return (
        <div id="Reset">
          <div className="reset-con">
            <form>
                
              <span className="text-center">Reset password</span>
              <p> A mail will be sent to your email <br></br>address with a link to continue <br></br>the password reset procedure </p> 
              <br></br>
              <div className="input-container">
                  
                <input type="password" required="" onChange={(e) => setPassword(e.target.value)} />
                <label>Password</label>
              </div>
              <div className="input-container">
                  
                <input type="password" required="" onChange={(e) => setConfirmPassword(e.target.value)} />
                <label>Confirm Password</label>
              </div>
              
              <button type="button" className="btn" onClick={() => onReset(password, confirmPassword)}>Reset password</button>
              <Link to="/login"><button type="button" className="btn">Cancel</button></Link>
            </form>
          </div>
        </div>
      )
}
  
}

export default Reset;