import { deleteUser, updateUser } from '../components/UserFunctions';
import { FaCheck, FaChevronDown, FaTimes } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { animated } from 'react-spring';
import { ChromePicker } from 'react-color';
import { UserContext } from '../hooks/UserContext';
import '../styles/User.scss';

//Load the profile if the user is logged in, if not send them to the login screen
function Profile() {
	const { user, setUser, logout } = useContext(UserContext);
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [colour, setColour] = useState(null);
	const [userId, setUserId] = useState(null);
	const [showColorPicker, setShowColorPicker] = useState(false);
	const [oldPass, setOldPass] = useState("");
	const [newPass, setNewPass] = useState("");
	const [newPass2, setNewPass2] = useState("");
	const [passwordToggle, setPasswordToggle] = useState(false);


	useEffect(() => {
			setFirstName(user.first_name);
			setLastName(user.last_name);
			setColour(user.colour);
			setUserId(user._id);
	}, []);

	function cancel() {
		setFirstName(user.first_name);
		setLastName(user.last_name);
		setColour(user.colour);
		setOldPass("");
		setNewPass("");
		setNewPass2("");
		setPasswordToggle(false);
		setShowColorPicker(false);
	}


	function _updateUser(e) {
		e.preventDefault();

		if (passwordToggle) {
			if (newPass !== newPass2) {
				console.log("Passwords doesnt match")
				return;
			}
			if (oldPass === ""){
				console.log("Input old password")
				return;
			}
				updateUser(firstName, lastName, colour, oldPass, newPass).then(res => {
						res.json().then(json => {
							console.log("User updated")
							setUser(json);
						});
					
				})
		} else {
				updateUser(firstName, lastName, colour).then(res => {
						res.json().then(json => {
							console.log("User updated")
							setUser(json);
						});
				});
		}
	}

	function _deleteUser() {
		deleteUser(userId).then(res => {
					console.log("User was deleted")
					logout();
			
		});
	}

	return (
	<div id="Login">
    <div className="profile-con">
	   <form>
		  <span className="text-center">Profile</span>
		  
	     <div className="input-container">
		    <input type="text" required="" value={firstName} maxLength={40} onChange={(e) => setFirstName(e.target.value)}/>
		    <label>First name</label>		
	     </div>
	     <div className="input-container">		
		    <input type="text" required="" value={lastName} maxLength={40} onChange={(e) => setLastName(e.target.value)}/>
		    <label>Last name</label>
	     </div>
		 <div className="input-container">
		            <input type="text" required="" value={colour} onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}/>
		            <label>Colour</label>
					{showColorPicker && (
						<ChromePicker
						color={colour}
						value={colour}
						onChange={updatedColor => setColour(updatedColor.hex)}
						/>
					)}
								
	                </div>
			   	 <div>
					<div className={`header ${passwordToggle && "active"}`} onClick={() => setPasswordToggle(!passwordToggle)}>
						<h1>
							{passwordToggle ?
								<FaCheck /> : <FaTimes />}
							New Password
						</h1>

						<FaChevronDown />
					</div>
					<animated.div className={`input-container ${!passwordToggle ? "hidden" : ""}`}>
								<label></label>
								<input type="password" name="password" placeholder="Current Password"
									maxLength={1024}
									value={oldPass}
									onChange={(e) => setOldPass(e.target.value)}
								/>
								<br/>
					
						<label></label>
						<input type="password" name="new-password1" placeholder="New Password"
							value={newPass}
							onChange={(e) => setNewPass(e.target.value)}
						/>
						<br></br>
						<input type="password" name="new-password2" placeholder="Re-enter Password"
							value={newPass2}
							onChange={(e) => setNewPass2(e.target.value)}
						/>
			
					</animated.div>
				</div>

		   <button type="button" className="btn" onClick={_updateUser}>Save</button>
		   <button className="btn" type="button" onClick={cancel}>Cancel</button>
		   <br></br>
		   <button className="btn red" type="button" onClick={_deleteUser}>Delete</button>
		   <button className="btn" type="button" onClick={logout}>Logout</button>
      
      </form>	
    </div>
 </div>
	);
}

export default Profile;