import React from "react";
import { MyContext } from "../../context/Context";

export default class Login extends React.Component {
  static contextType = MyContext;

  render() {
    return (
      <div>
        {this.context.state.user}
      </div>
    );
  }
}