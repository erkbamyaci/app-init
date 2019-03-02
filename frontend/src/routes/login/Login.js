import React from "react";
import {MyContext} from "../../context/Context";
import auth from "../../services/auth";

export default class Login extends React.Component {
    static contextType = MyContext;

    state = {
        email: "",
        password: ""
    };

    valueChanged = (stateName, value) => {
        this.setState({[stateName]: value});
    };

    login = async () => {

        const {email, password} = this.state;

        const data = await auth.login(email, password);
        console.log(data);
    };

    logout = async () => {
        await auth.logout();
        console.log("logged out");
    };

    render() {
        const {email, password} = this.state;

        return (
            <div>
                <input
                    value={email}
                    placeholder="Email"
                    onChange={(e) => this.valueChanged("email", e.target.value)}
                />
                <input
                    value={password}
                    placeholder="Password"
                    onChange={(e) => this.valueChanged("password", e.target.value)}
                />
                <button type="button" onClick={this.login}>
                    Login
                </button>
                <button type="button" onClick={this.logout}>
                    Logout
                </button>
            </div>
        );
    }
}
