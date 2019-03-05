import React from "react";
import auth from "../../services/auth";

export default class Home extends React.Component {

    logout = async () => {
        await auth.logout();
        console.log("logged out");
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
