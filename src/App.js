import './styles/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import BoardList from './pages/BoardList';
import UserProvider from './hooks/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
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
      </UserProvider>
    </Router>
  );
}

export default App;
