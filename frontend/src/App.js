import React from "react";
import {Router, Switch} from "react-router-dom";
import {UserProvider} from "./context/UserContext";
import Login from "./routes/login/Login";
import Home from "./routes/home/Home";
import history from "./history";
import {PrivateRoute, LoginRoute} from "./components/Routes";

class App extends React.Component {

    render() {

        return (
            <UserProvider>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={Home}/>
                        <LoginRoute exact path="/login" component={Login}/>
                    </Switch>
                </Router>
            </UserProvider>
        );
    }
}

export default App;
