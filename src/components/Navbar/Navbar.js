import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Popover, SnackbarContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { logout } from "../../store/actions/authActions";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(theme => ({
  popover: {
    position: "absolute",
    top: "150%",
    right: "0%",
    width: "300px",
    padding: "20px",
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius
  },
  avatar: {
    width: "30px",
    height: "30px"
  },
  popoverContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  success: {
    backgroundColor: "green"
  },
  email: {
    fontSize: "14px"
  }
}));

const handleSidebar = () => {
  const sidebar = document.getElementById("sidebar");
  if (sidebar.style.left == "-100%") {
    sidebar.style.left = 0;
  } else {
    sidebar.style.left = "-100%";
  }
};

const Navbar = props => {
  const [snackState, setSnackState] = React.useState(false);
  const classes = useStyles();

  const MenuItems = !props.authenticated ? (
    <React.Fragment>
      <Link to={"/login"}>
        <Button color="inherit">Login</Button>
      </Link>
      <Link to={"/signup"}>
        <Button color="inherit">Sign Up</Button>
      </Link>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Link to={"/"}>
        <Button color="inherit">Dashboard</Button>
      </Link>
      <Link to={"/create"}>
        <Button color="inherit">Create Project</Button>
      </Link>
      <Link to={"/myprojects"}>
        <Button color="inherit">My Projects</Button>
      </Link>
      <Link className="popoverbutton">
        <Button onClick={props.showPopoverHandler} color="inherit">
          <Avatar
            alt="Remy Sharp"
            src="https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-6/128/profile-male-circle2-512.png"
            className={classes.avatar}
          />
        </Button>
        <div
          style={{
            visibility: props.showPopover ? "visible" : "hidden",
            backgroundColor: "#3f51b5"
          }}
          className="popover"
        >
          <div className={classes.popoverContent}>
            <div>
              <Typography>
                {props.userDetails[0].firstName +
                  " " +
                  props.userDetails[0].lastName}
              </Typography>
              <Typography className={classes.email}>
                {props.userDetails[0].email}
              </Typography>
            </div>

            <Button
              onClick={() => {
                props.logout();
                setSnackState(true);
              }}
              color="inherit"
            >
              Logout
            </Button>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );

  return (
    <div>
      <AppBar className="navbar" position="fixed">
        <Toolbar>
          <IconButton
            onClick={handleSidebar}
            className="menu-icon-btn"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            <Link to="/">Project Book</Link>
          </Typography>
          <div className="Navbar-Items">{MenuItems}</div>
        </Toolbar>
      </AppBar>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        onClose={() => setSnackState(false)}
        autoHideDuration={3000}
        open={snackState}
      >
        <SnackbarContent
          className={classes.success}
          test
          message="Logout Successfull"
        />
      </Snackbar>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    uid: state.auth.uid,
    userDetails: state.firebase.ordered.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    { collection: "users", doc: props.uid ? props.uid : null }
  ])
)(Navbar);
