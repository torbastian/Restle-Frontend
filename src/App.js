import './styles/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Navigatetest from './pages/Navigatetest';


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div id="content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/navigatetest" component={Navigatetest} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
