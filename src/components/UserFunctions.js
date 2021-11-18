const route = process.env.REACT_APP_API_URL + '/user';

//Update user and password
export async function updateUser(firstName, lastName, colour, oldPassword = null, newPassword = null) {
	var body = {
		first_name: firstName,
		last_name: lastName,
		colour: colour
	};

	if (oldPassword && newPassword) {
		body = {
			...body,
			password: oldPassword,
			new_password: newPassword
		}
	}

	return fetch(`${route}/update`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(body)
	}).then(res => { return res });
}

//Update user and password as admin
export async function adminUpdateUser(userId, firstName, lastName, colour, isAdmin = false, newPassword = null) {
	var body = {
		first_name: firstName,
		last_name: lastName,
		colour: colour,
		isAdmin: isAdmin,
		userId: userId
	};

	console.log(newPassword);

	if (newPassword) {
		body = {
			...body,
			new_password: newPassword
		}
	}

	return fetch(`${route}/admin/update`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(body)
	}).then(res => { return res });
}





export async function deleteUser(userId) {
	return fetch(`${route}/${userId}`, {
		method: 'DELETE',
		credentials: 'include'
	}).then(res => { return res });
}