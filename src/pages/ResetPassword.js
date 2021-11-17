import { useState } from "react";
import { useHistory } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { useUserContext } from "../hooks/UserContext";
import '../styles/ResetPassword.scss';

function Reset() {
  const [email, setEmail] = useState("");

function onReset() {

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
          <button type="button" className="btn" onClick={onReset}>Reset password</button>
          <Link to="/login"><button type="button" className="btn">Cancel</button></Link>
        </form>
      </div>
    </div>
  )
}

export default Reset;