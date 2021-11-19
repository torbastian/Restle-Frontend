import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ColorSelector from '../components/ColorSelector';
import { ChromePicker } from 'react-color';
import '../styles/User.scss';


function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("")
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [colour, setColour] = useState("#fff");
	const [showColorPicker, setShowColorPicker] = useState(false);

	const history = useHistory();

	function onSubmit(e) {
		e.preventDefault();


		if (password !== confirmPassword) {
			console.log("Passwords doesnt match")
			return;
		}

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
			.then(res => {
				console.log(res);
				if (res.ok) {
					history.push('/boards');
				}
			})
	}

	return (
		<div className="user-style">
			<div className="register-con">
				<form className="user-frm" onSubmit={onSubmit}>
					<span className="text-center">Sign up</span>
					<div className="input-container">
						<input type="text" required="" onChange={(e) => setUsername(e.target.value)} />
						<label>Username</label>
					</div>
					<div className="input-container">
						<input type="password" required="" onChange={(e) => setPassword(e.target.value)} />
						<label>Password</label>
					</div>
					<div className="input-container">
						<input type="password" required="" onChange={(e) => setConfirmPassword(e.target.value)} />
						<label>Confirm password</label>
					</div>
					<div className="input-container">
						<input type="text" required="" onChange={(e) => setEmail(e.target.value)} />
						<label>Email</label>
					</div>
					<div className="input-container">
						<input type="text" required="" onChange={(e) => setFirstName(e.target.value)} />
						<label>First name</label>
					</div>
					<div className="input-container">
						<input type="text" required="" onChange={(e) => setLastName(e.target.value)} />
						<label>Last name</label>
					</div>
					<ColorSelector color={colour} setColor={setColour} user={{ first_name: firstName, last_name: lastName, colour: colour }} />
					<button type="button" className="btn" onClick={onSubmit}>Sign up</button>
					<Link to="/login"><button type="button" className="btn">Cancel</button></Link>
				</form>
			</div>
		</div>
	)
}

export default Register;