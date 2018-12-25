import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import NavBar from "./utils/NavBar";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import BlogList from "./pages/blogpage/BlogList";
import LoggedRoute from "./utils/LoggedRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import CreatePost from "./pages/createpost/CreatePost";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="app">
        <NavBar />
        <div className="ui ">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <LoggedRoute path="/signup" component={Signup} />
            <LoggedRoute path="/login" component={Login} />
            <ProtectedRoute path="/home" component={Home} />
            <ProtectedRoute path="/blog" component={BlogList} />
          </Switch>
        </div>
      </div>
    );
  }
}
