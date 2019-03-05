import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import {UserProvider} from "./context/UserContext";
import Login from "./routes/login/Login";
import Home from "./routes/home/Home";
import auth from "./services/auth";
import history from "./history";
import {PrivateRoute, LoginRoute} from "./components/Routes";

class App extends React.Component {

    render() {

        return (
            <UserProvider>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact isAuthenticated={auth.loggedIn()} path="/" component={Home}/>
                        <LoginRoute exact isAuthenticated={auth.loggedIn()} path="/login" component={Login}/>
                    </Switch>
                </Router>
            </UserProvider>
        );
    }
}

export default App;
