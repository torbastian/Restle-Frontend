import './styles/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import BoardList from './pages/BoardList';
import UserProvider from './hooks/UserContext';
import PopupProvider from './hooks/PopupContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <PopupProvider>
          <div className="App">
            <Nav />
            <div id="content">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/board_overview" component={BoardList} />
              </Switch>
            </div>
          </div>
        </PopupProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
