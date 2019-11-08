import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Auth.css";
import {
  Typography,
  CircularProgress,
  SnackbarContent
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import PasswordIcon from "@material-ui/icons/Lock";
import * as authActions from "../../store/actions/authActions";
import { firebaseConnect } from "react-redux-firebase";
import Snackbar from "@material-ui/core/Snackbar";
// import { makeStyles } from '@material-ui/core';

let classes = null;

class Auth extends Component {
  state = {
    email: "",
    password: "",
    snackState: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = event => {
    event.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    let creds = { email, password };
    this.props.handleLogin(creds);
  };

  componentDidUpdate = previousState => {
    if (previousState.authenticated !== this.props.authenticated) {
      this.setState({
        snackState: true
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Paper className="form-container">
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            onClose={() => this.setState({ snackState: false })}
            autoHideDuration={3000}
            open={this.state.snackState}
          >
            <SnackbarContent
              className="snackbar-success"
              test
              message="LogIn Successfull"
            />
          </Snackbar>
          {this.props.authenticated ? (
            <React.Fragment>
              <Typography variant="h5" align="center">
                Welcome on board
              </Typography>
              <Typography className="links-container">
                <Link to="/" color="blue" className="links">
                  Dashbaord
                </Link>
                <Link to="/create" color="blue" className="links">
                  Create a project
                </Link>
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography variant="h5" align="center">
                Login
              </Typography>
              <form onSubmit={this.handleLogin} autoComplete="off">
                <FormControl fullWidth>
                  <TextField
                    name="email"
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    id="input-with-icon-textfield"
                    placeholder="Email id"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    name="password"
                    type="password"
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    id="input-with-icon-textfield"
                    placeholder="Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>
                <Typography
                  className="error-message"
                  paragrah="true"
                  align="center"
                  display="block"
                  color="error"
                >
                  {this.props.loginError ? this.props.loginError : null}
                </Typography>
                {!this.props.loginGoingOn ? (
                  <div className="login-cta">
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      Login
                    </Button>

                    <Link to="/login" className="forgot-pass">
                      Forgot Password ?
                    </Link>
                  </div>
                ) : (
                  <div className="progress-circle">
                    {" "}
                    <CircularProgress />{" "}
                  </div>
                )}
              </form>
            </React.Fragment>
          )}
        </Paper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginGoingOn: state.auth.loginGoingOn,
    loginError: state.auth.loginError,
    authenticated: state.auth.authenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleLogin: creds => dispatch(authActions.handleLogin(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
