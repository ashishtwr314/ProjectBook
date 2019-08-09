import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import "./Auth.css";
import { Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
// import { makeStyles } from '@material-ui/core';

let classes = null

class Auth extends Component {    
    
    render() { 
        return ( 
            <React.Fragment>
                <Paper className="form-container">
                    <Typography variant="h5" align="center"> Login </Typography>
                    <form autoComplete="off">
                        <FormControl fullWidth>
                            <TextField
                                margin="normal"
                                id="input-with-icon-textfield"
                                placeholder="Email id"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                margin="normal"
                                id="input-with-icon-textfield"
                                placeholder="Password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <PasswordIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                        <div className="login-cta">
                            <Button  size="large" variant="contained" color="primary">
                                Login
                            </Button>

                            <Link to="/login" className="forgot-pass" >
                                Forgot Password ?
                            </Link>
                        </div>
                    </form>
                </Paper>


            </React.Fragment>
         );
    }
}
 
export default Auth;