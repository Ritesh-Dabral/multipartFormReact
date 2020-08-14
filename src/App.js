import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Error from './components/error'
import AddUser from './components/AddUser'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AddUser} />
        <Route exact path="*" component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
