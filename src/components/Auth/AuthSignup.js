import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import "./Auth.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Typography,
  MenuItem,
  Fab,
  Button,
  CircularProgress
} from "@material-ui/core";
import { signUp } from "../../store/actions/authActions";

let classes = null;

class Auth extends Component {
  state = {
    formFeilds: [
      {
        label: "First Name",
        required: true,
        name: "firstName"
      },
      {
        label: "Last Name",
        required: true,
        name: "lastName"
      },
      {
        label: "Email",
        required: true,
        name: "email"
      },
      {
        label: "Password",
        required: true,
        minLen: 6,
        name: "password"
      },
      {
        label: "College (Optional)",
        name: "college"
      }
    ],

    firstName: "",
    lastName: "",
    email: "",
    password: "",
    college: ""
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    let newUserDetails = { ...this.state };
    delete newUserDetails.formFeilds;
    this.props.signUp(newUserDetails);
  };

  render() {
    if (this.props.authenticated) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <Paper className="form-container">
          <Typography variant="h5" align="center">
            {" "}
            Register for Free{" "}
          </Typography>
          <form onSubmit={e => this.onSubmitHandler(e)} autoComplete="off">
            {this.state.formFeilds.map(feild => (
              <FormControl key={feild.label} fullWidth>
                <TextField
                  name={feild.name}
                  value={feild.value}
                  className="input-feilds"
                  id="standard-with-placeholder"
                  label={feild.label}
                  placeholder={feild.label}
                  margin="normal"
                  onChange={e => this.onChangeHandler(e)}
                ></TextField>
              </FormControl>
            ))}
            <Typography align="center" color="error" className="error-message ">
              {this.props.signUpError}
            </Typography>
            <div className="signup-cta">
              {!this.props.signUpGoingOn ? (
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              ) : (
                <div className="progress-circle">
                  <CircularProgress />
                </div>
              )}

              <Link to="/login" className="already-registered">
                Already a member ? Login Here
              </Link>
            </div>
          </form>
        </Paper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    signUpError: state.auth.signUpError,
    signUpGoingOn: state.auth.signUpGoingOn,
    authenticated: state.auth.authenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signUp: newUserDetails => dispatch(signUp(newUserDetails))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
