import React from "react";
import auth from "../../services/auth";
import history from "../../history";

export default class Home extends React.Component {

    logout = async () => {
        await auth.logout();
        console.log("logged out");

        history.replace("/login");
    };

    render() {

        return (
            <div>
                <button type="button" onClick={this.logout}>
                    Logout
                </button>
            </div>
        );
    }
}
