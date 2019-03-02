import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Login from "./routes/login/Login";
import history from "./history";

class App extends Component {
  render() {
    return (
      <UserProvider>
        <Router history={history} >
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
