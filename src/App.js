import './styles/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BoardList from './pages/BoardList';
import UserProvider from './hooks/UserContext';
import PopupProvider from './hooks/PopupContext';
import Board from './pages/Board';
import PrivateRoute from './routes/PrivateRoute';
import AdminOverview from './pages/AdminOverview';
import Profile from './pages/Profile';
import LoggedInRoute from './routes/LoggedInRoute';
import { CookiesProvider } from 'react-cookie';
import Reset from './pages/ResetPassword';


function App() {
  return (
    <Router>
      <CookiesProvider>
        <UserProvider>
          <PopupProvider>
            <div className="App">
              <Nav />
              <div id="content">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <LoggedInRoute path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/resetpass" component={Reset} />
                  <Route path="/AdminOverview" component={AdminOverview} />
                  <PrivateRoute path="/boards" exact component={BoardList} />
                  <PrivateRoute path="/profile" component={Profile} />
                  <PrivateRoute path="/boards/:id" component={Board} />
                </Switch>
              </div>
            </div>
          </PopupProvider>
        </UserProvider>
      </CookiesProvider>
    </Router>
  );
}

export default App;
