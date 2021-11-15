import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ColorSelector from '../components/ColorSelector';
import { ChromePicker } from 'react-color';
import '../styles/Register.scss';


function Register() {
	const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [colour, setColour] = useState("#fff");
	const [showColorPicker, setShowColorPicker] = useState(false);

	function onSubmit(e) {
		e.preventDefault();

		const requestNewUser = {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
                email: email,
				first_name: firstName,
				last_name: lastName,
				colour: colour,
                password: password
			})
		};

		fetch(process.env.REACT_APP_API_URL + '/user/register', requestNewUser)
			.then(res => {console.log(res)})
	}

	return (
		<div id="Register">
			<div className="register-con">
				<form className="user-frm" onSubmit={onSubmit}>
				    <span className="text-center">Sign up</span>
					<div className="input-container">
		            <input type="text" required="" onChange={(e) => setUsername(e.target.value)}/>
		            <label>Username</label>		
	                </div>
					<div className="input-container">
		            <input type="password" required="" onChange={(e) => setPassword(e.target.value)}/>
		            <label>Password</label>		
	                </div>
					<div className="input-container">
		            <input type="text" required="" onChange={(e) => setEmail(e.target.value)}/>
		            <label>Email</label>		
	                </div>
					<div className="input-container">
		            <input type="text" required="" onChange={(e) => setFirstName(e.target.value)}/>
		            <label>First name</label>		
	                </div>
					<div className="input-container">
		            <input type="text" required="" onChange={(e) => setLastName(e.target.value)}/>
		            <label>Last name</label>		
	                </div>
					<div className="input-container">
		            <input type="text" required="" value={colour} onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}/>
		            <label>Colour</label>
					{showColorPicker && (
						<ChromePicker
						color={colour}
						onChange={updatedColor => setColour(updatedColor.hex)}
						/>
					)}
								
	                </div>
					



					<button type="button" className="btn" onClick={onSubmit}>Sign up</button>
                    <Link to="/login"><button type="button" className="btn">Cancel</button></Link> 
				</form>
			</div>
		</div>
	)
}

export default Register;