import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import "./Auth.css";
import { Link } from "react-router-dom";
import { Typography, MenuItem, Fab, Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core';

let classes = null

class Auth extends Component {

    state = {
        formFeilds : [
            {
                label: "First Name", 
                required: true
            },
            {
                label: "Last Name",
                required: true
            },
            {
                label: "Email",
                required: true
            },
            {
                label: "Password",
                required: true,
                minLen: 6
            },
            {
                label: "College (Optional)"
            },

        ],
        coursesFeild : [
            {name: "Bachelors of Engg.", id: 1 },
            {name:  "Bachelors of Tech.", id: 2 },
            {name: "Bachelors of Comp. App.", id: 3 },
            {name: "Others" ,id: 4}        
       ]
    }
    
    
    
    
    render() { 
        return ( 
            <React.Fragment>
                <Paper className="form-container">
                    <Typography variant="h5" align="center"> Register for Free </Typography>
                    <form autoComplete="off">
                        {this.state.formFeilds.map(feild => (
                            <FormControl key={feild.label} fullWidth>
                                <TextField
                                    className = "input-feilds"
                                    id="standard-with-placeholder"
                                    label={feild.label}
                                    placeholder={feild.label}
                                    margin="normal"
                                >
                                </TextField>  
                            </FormControl>
                        ))}
                        <FormControl fullWidth>
                            <TextField select  className = "input-feilds" id="standard-with-placeholder" label="Course" placeholder="Course">
                                {this.state.coursesFeild.map(course => (
                                    <MenuItem key={course.id} value={course.id} >
                                        {course.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <div className="signup-cta">
                            <Button  size="large" variant="contained" color="primary">
                                Sign Up
                            </Button>

                            <Link to="/login" className="already-registered" >
                                Already a member ? Login Here
                            </Link>
                        </div>
                    </form>
                </Paper>


            </React.Fragment>
         );
    }
}
 
export default Auth;