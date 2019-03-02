import React from "react";
import { MyContext } from "./Context";

export class UserProvider extends React.Component {
  state = {
    user: "erk"
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    )
  }
}