import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import "./CreateProject.css";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { Redirect } from "react-router-dom";
import {
  projectCreationStart,
  createProject
} from "../../store/actions/projectActions";
import {
  Typography,
  MenuItem,
  Fab,
  Button,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import QRCode from "qrcode.react";
import ProjectCreated from "./ProjectCreated";

class CreateProject extends Component {
  state = {
    formFeilds: [
      {
        label: "Project Name",
        required: true,
        name: "name",
        type: "input"
      },
      {
        label: "Breif Introduction",
        required: true,
        name: "intro",
        type: "input"
      },
      {
        label: "Description",
        required: true,
        textarea: true,
        name: "desc",
        type: "input"
      },
      {
        label: "Front End Technologies",
        required: true,
        type: "checkbox",
        name: "frontEnd",
        techs: ["HTML", "CSS", "VanillaJS", "jQuery", "React", "Angular", "Vue"]
      },
      {
        label: "Back End Technologies",
        required: true,
        type: "checkbox",
        name: "backEnd",
        techs: ["SQL", "PHP", "Node", "MonoDB", "FireStore", "ASP", "Wordpress"]
      },
      {
        label: "Technologies used",
        required: true,
        name: "techStr",
        type: "input"
      }
    ],

    name: "",
    intro: "",
    techUsed: "",
    desc: "",
    techStr: "",
    img: ""
  };

  addAnotherProject = () => {
    this.setState({
      name: "",
      intro: "",
      desc: "",
      techStr: "",
      techUsed: ""
    });
    this.props.addAnotherProject();
  };

  onSubmitHandler = e => {
    e.preventDefault();

    let tech = this.state.techStr.split(",");
    console.log(tech);

    this.setState(
      {
        techUsed: tech
      },
      () => {
        let projectDetails = { ...this.state };
        delete projectDetails.formFeilds;
        this.props.projectCreationStart();
        this.props.onNewProject(projectDetails);
      }
    );
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return !this.props.authenticated ? (
      <Redirect to="/" />
    ) : (
      <Paper className="form-container">
        {this.props.newlyCreatedPostId ? (
          <ProjectCreated
            addAnotherProject={this.addAnotherProject}
            newlyCreatedPostId={this.props.newlyCreatedPostId}
          />
        ) : (
          <React.Fragment>
            <Typography variant="h5" align="center">
              Tell us about your project
            </Typography>
            <form onSubmit={this.onSubmitHandler} autoComplete="off">
              {this.state.formFeilds.map(feild =>
                feild.type == "input" ? (
                  <FormControl key={feild.label} fullWidth>
                    <TextField
                      multiline={feild.textarea}
                      className="input-feilds"
                      id="standard-with-placeholder"
                      label={feild.label}
                      placeholder={feild.label}
                      margin="normal"
                      name={feild.name}
                      value={this.state[feild.name]}
                      onChange={this.onChangeHandler}
                      helperText={
                        feild.name == "techStr"
                          ? "Specify technologies with commas in between"
                          : null
                      }
                    />
                  </FormControl>
                ) : null
              )}
              {this.props.showCreationLoader ? (
                <div className="progress-circle">
                  {" "}
                  <CircularProgress />{" "}
                </div>
              ) : (
                <div className="signup-cta">
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </div>
              )}
            </form>
          </React.Fragment>
        )}
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  //   console.log(state);
  return {
    projectCreationLoaded: state.project.projectCreationLoaded,
    showCreationLoader: state.project.showCreationLoader,
    newlyCreatedPostId: state.project.newlyCreatedPostId,
    authenticated: state.auth.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAnotherProject: () =>
      dispatch({ type: actionTypes.ADD_ANOTHER_PROJECT }),
    projectCreationStart: () => dispatch(projectCreationStart()),
    onNewProject: projectDetails => dispatch(createProject(projectDetails))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
