import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ColorSelector from '../components/ColorSelector';


function Register() {
	const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [colour, setColour] = useState("#fff");

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
					<h1>Sign Up</h1>
					<input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
					<input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
					<input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
					<input type="text" name="firstname" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
					<input type="text" name="lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
					<ColorSelector
						user={{ first_name: firstName, last_name: lastName, colour: colour }}
						color={colour} setColor={setColour}
						showBackground={true}
						showTitle={true}
					/>
					<p>Already have an Account? <Link to="/login">Sign In</Link></p>
					<input type="submit" value="Register" />
				</form>
			</div>
		</div>
	)
}

export default Register;