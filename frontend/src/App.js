import React from "react";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {UserProvider} from "./context/UserContext";
import Login from "./routes/login/Login";
import Home from "./routes/home/Home";
import auth from "./services/auth";
import history from "./history";

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (

    <Route
        {...rest}
        render={(props) => (
            isAuthenticated ? (
                <Component {...props}/>
            ) : (
                <Redirect
                    to={{
                        pathname: "login",
                        state: {from: props.location}
                    }}
                />
            )
        )}
    />
);

class App extends React.Component {

    render() {

        return (
            <UserProvider>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact isAuthenticated={auth.loggedIn()} path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                    </Switch>
                </Router>
            </UserProvider>
        );
    }
}

export default App;
