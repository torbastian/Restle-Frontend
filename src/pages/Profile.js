import { deleteUser, updateUser, adminUpdateUser } from '../components/UserFunctions';
import { FaCheck, FaChevronDown, FaTimes } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { UserContext } from '../hooks/UserContext';
import '../styles/User.scss';
import { usePopup } from "../hooks/PopupContext";
import ColorSelector from '../components/ColorSelector';

//Load the profile if the user is logged in, if not send them to the login screen
function Profile({ _user, admin = false, sync = undefined }) {
	const { user, setUser, logout } = useContext(UserContext);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [colour, setColour] = useState("");
	const [userId, setUserId] = useState("");
	const [showColorPicker, setShowColorPicker] = useState(false);
	const [oldPass, setOldPass] = useState("");
	const [newPass, setNewPass] = useState("");
	const [adminToggle, setAdminToggle] = useState(false);
	const [newPass2, setNewPass2] = useState("");
	const [passwordToggle, setPasswordToggle] = useState(false);
	const { createPopup, closePopup, createDialogue } = usePopup();
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		if (_user) {
			setFirstName(_user.first_name);
			setLastName(_user.last_name);
			setColour(_user.colour);
			setPasswordToggle(false);
			setShowColorPicker(false);
			setNewPass("");
			setNewPass2("");
			setAdminToggle(_user.isAdmin);
			setUserId(_user._id);
		} else {
			setFirstName(user.first_name);
			setLastName(user.last_name);
			setColour(user.colour);
			setUserId(user._id);
		}
	}, [_user]);

	function cancel() {
		if (_user) {
			setFirstName(_user.first_name);
			setLastName(_user.last_name);
			setColour(_user.colour);
		} else {
			setFirstName(user.first_name);
			setLastName(user.last_name);
			setColour(user.colour);
		}
		setOldPass("");
		setNewPass("");
		setNewPass2("");
		setPasswordToggle(false);
		setShowColorPicker(false);
	}

	function _updateUser(e) {
		e.preventDefault();

		if (passwordToggle) {
			if (newPass === "") {
				setErrorMsg("Input nyt password");
				return;
			}

			if (newPass !== newPass2) {
				console.log("Passwords matcher ikke");
				return;
			}


			if (admin) {
				adminUpdateUser(_user._id, firstName, lastName, colour, adminToggle, newPass).then(res => {
					responseCheck(res);
				})
			}
			else {
				if (oldPass === "") {
					setErrorMsg("Input old password");
					return;
				}

				updateUser(firstName, lastName, colour, oldPass, newPass).then(res => {
					responseCheck(res);
				})
			}

		} else {

			if (admin) {
				adminUpdateUser(_user._id, firstName, lastName, colour, adminToggle).then(res => {
					responseCheck(res);
				});
			}
			else {
				updateUser(firstName, lastName, colour).then(res => {
					responseCheck(res);
				});
			}

		}
		if (sync) {
			sync();
		}
	}

	function responseCheck(res) {
		console.log(res.ok);
		res.json().then(json => {
			if (res.ok) {
				console.log("User updated")
				createPopup(<div><button className="btn blu" onClick={closePopup}>OK</button></div>, "User updated", undefined);
				if (!admin) {
					setUser(json);
				}
			} else {
				setErrorMsg(json.message);
			}
		});
	}

	function _deleteUser() {
		createDialogue("er du helt siker på at du vil slettebrugeren du er logget ind på?", { class: "blu", text: "Delete" }, undefined, doDelete);
	}

	function doDelete() {
		closePopup();
		if (admin) {
			deleteUser(_user._id).then(res => {
				console.log("User was deleted")
				logout();
			});
		}
		else {
			deleteUser(userId).then(res => {
				console.log("User was deleted")
				logout();
			});
		}
		if (sync) {
			sync();
		}
	}

	return (
		<div className="user-style">
			<form className="profile-con">
				<span className="text-center">Profile</span>

				<div className="input-container">
					<input type="text" required="" value={firstName} maxLength={40} onChange={(e) => setFirstName(e.target.value)} />
					<label>First name</label>
				</div>
				<div className="input-container">
					<input type="text" required="" value={lastName} maxLength={40} onChange={(e) => setLastName(e.target.value)} />
					<label>Last name</label>
				</div>
				<ColorSelector color={colour} setColor={setColour} user={{ first_name: firstName, last_name: lastName, colour: colour }} />


				{admin &&
					<div className="header" onClick={() => setAdminToggle(!adminToggle)}>
						<h1>
							{adminToggle ?
								<FaCheck /> : <FaTimes />}
							Admin
						</h1>
					</div>
				}

				<div>
					<div className={`header ${passwordToggle && "active"}`} onClick={() => setPasswordToggle(!passwordToggle)}>
						<h1>
							{passwordToggle ?
								<FaCheck /> : <FaTimes />}
							New Password
						</h1>

						<FaChevronDown />
					</div>
					<div className={`input-container ${!passwordToggle ? "hidden" : ""}`}>
						<label></label>
						{!admin &&
							<input type="password" name="password" placeholder="Current Password"
								maxLength={1024}
								value={oldPass}
								onChange={(e) => setOldPass(e.target.value)}
							/>
						}
						{!admin &&
							<br />
						}

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
					</div>
				</div>
				<p className="errorMessage">{errorMsg}</p>
				<div className="btn-container">
					<button className="btn" type="button" onClick={cancel}>Cancel</button>
					<button type="button" className="btn blu" onClick={_updateUser}>Save</button>
				</div>
				<div className="btn-container">
					<button className="btn red" type="button" onClick={_deleteUser}>Delete</button>
				</div>

			</form>
		</div>
	);
}

export default Profile;