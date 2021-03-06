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
import AdminRoute from './routes/AdminRoute';
import AdminOverview from './pages/AdminOverview';
import Profile from './pages/Profile';
import LoggedInRoute from './routes/LoggedInRoute';
import { CookiesProvider } from 'react-cookie';
import Reset from './pages/ResetPassword';
import AdminBoardOverview from './pages/AdminBoardOverview';
import ActuelPasswordReset from './pages/ActuelPasswordReset';


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
                  <LoggedInRoute path="/register" component={Register} />
                  <LoggedInRoute path="/resetpass" exact component={Reset} />
                  <Route path="/resetPassword/:token" component={ActuelPasswordReset}/>
                  <AdminRoute path="/AdminOverview" component={AdminOverview} />
                  <PrivateRoute path="/boards" exact component={BoardList} />
                  <PrivateRoute path="/profile" component={Profile} />
                  <PrivateRoute path="/boards/:id" component={Board} />
                  <AdminRoute path="/AdminBoardOverview" component={AdminBoardOverview} />
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
