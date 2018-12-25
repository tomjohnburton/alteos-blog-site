import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Home extends Component {
  render() {
    return (
      <div>
        Hello welcome home
        <button onClick={this.handleLogOutClick}>LogOut</button>
      </div>
    );
  }
}

export default withRouter(Home);
