import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/dashboard'


function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <h3>
            Simple to-do list
          </h3>
        </nav>
        <Switch>
          <Route exact path="/" component={Login}>
          </Route>
          <Route path="/dashboard" component={Dashboard}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
