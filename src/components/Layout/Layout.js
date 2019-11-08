import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import AuthSingup from "../Auth/AuthSignup";
import AuthLogin from "../Auth/AuthLogin";
import Container from "@material-ui/core/Container";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import CreateProject from "../CreateProject/CreateProject";

class Layout extends Component {
  state = {
    showPopover: false
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          showPopoverHandler={() =>
            this.setState({ showPopover: !this.state.showPopover })
          }
          showPopover={this.state.showPopover}
        />
        <div id="sidebar" class="sidebar">
          I am a sidebar
        </div>
        <Container
          onClick={() => this.setState({ showPopover: false })}
          style={{ marginTop: "106px" }}
          maxWidth="lg"
        >
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/signup" component={AuthSingup} />
            <Route exact path="/login" component={AuthLogin} />
            <Route exact path="/create" component={CreateProject} />
            <Route exact path="/projects/:id" component={ProjectDetails} />
          </Switch>
        </Container>
      </React.Fragment>
    );
  }
}

export default Layout;
