import { useUserContext } from '../hooks/UserContext';
import { Redirect, Route } from 'react-router-dom';
import Loading from '../components/Loading';

function PrivateRoute(props) {
  const { Component, ...rest } = props;
  const { user, isLoading } = useUserContext();

  //Hvis brugeren loader, render loading
  if (isLoading) return <Loading />

  //Hvis brugeren ikke er null, returner komponentet
  if (user !== null) {
    return (
      <Route {...rest} render={props => (
        <Component {...props} />
      )} />
    )
  }

  //Hvis det overstående ikke er sandt, send brugeren til login
  return <Redirect to='/login' />

}

export default PrivateRoute;