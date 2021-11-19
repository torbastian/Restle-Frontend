import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../hooks/UserContext";
import Loading from "../components/Loading";

function AdminRoute(props) {
	const { Component, ...rest } = props;
	const { user, isLoading } = useUserContext();

	//if loading, display loading
	if (isLoading) {
		return <Loading />
	}

	//If the user IS null, return the component
	if (user.isAdmin) {
		return (
			<Route {...rest} render={props => (
				<Component {...props} />
			)} />
		)
	}
	
	return <Redirect to='/' />
}

export default AdminRoute;