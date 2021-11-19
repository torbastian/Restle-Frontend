import { useState } from "react";
import { useHistory } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { useUserContext } from "../hooks/UserContext";
import { usePopup } from "../hooks/PopupContext";
import '../styles/ResetPassword.scss';

function Reset() {
  const [email, setEmail] = useState("");
  const {createDialogue, closePopup} = usePopup();
  const history = useHistory();

function onReset(_email) {
  console.log("onReset");

  const requestLogin = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ email:_email })
  };

  fetch(process.env.REACT_APP_API_URL + '/user/resetPassword', requestLogin);
  createDialogue("Mail sendt", {class: "blu", text: "OK"}, undefined, goToLogin);
  
}

function goToLogin(){
  closePopup();
  history.push("/login");
}
  return (
    <div id="Reset">
      <div className="reset-con">
        <form>
            
          <span className="text-center">Reset password</span>
          <p> A mail will be sent to your email <br></br>address with a link to continue <br></br>the password reset procedure </p> 
          <br></br>
          <div className="input-container">
              
            <input type="text" required="" onChange={(e) => setEmail(e.target.value)} />
            <label>Email</label>
          </div>
          <button type="button" className="btn" onClick={() => onReset(email)}>Reset password</button>
          <Link to="/login"><button type="button" className="btn">Cancel</button></Link>
        </form>
      </div>
    </div>
  )
}

export default Reset;