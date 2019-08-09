import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import "./Navbar.css";
import { Link } from "react-router-dom"


const Navbar = () => {

    const MenuItems = (
        <React.Fragment>
            <Link to={"/login"}><Button color="inherit">Login</Button></Link>
            <Link to={"/signup"}><Button color="inherit">Sign Up</Button></Link>
        </React.Fragment>
    )

    return ( 
        <div>
            <AppBar className="navbar" position="static">
                <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon  />
                </IconButton>
                <Typography variant="h6" >
                    <Link to="/">Project Book</Link>
                </Typography>
                <div className="Navbar-Items">
                    {MenuItems}
                </div>
                </Toolbar>
            </AppBar>
        </div>
     );
}
 
export default Navbar;