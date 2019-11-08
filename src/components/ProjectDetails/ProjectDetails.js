import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import "./ProjectDetails.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  BottomNavigationAction,
  BottomNavigation,
  Typography,
  CircularProgress,
  AppBar,
  Tabs,
  Tab
} from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { navActionLoader } from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  bottomNav: {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
    marginTop: "50px"
  },
  projectName: {
    margin: "20px 0"
  },
  projectInro: {
    margin: "0 100px"
  },
  projectDesc: {
    fontSize: "20px",
    margin: "0 100px"
  },
  techUsed: {
    maxWidth: "450px",
    maxHeight: "300px",
    margin: "0 auto",
    overflow: "scroll"
  },
  QR: {
    margin: "20px 0",
    width: "250px"
  }
}));

const ProjectDetails = props => {
  let project = null;
  if (props.project) {
    project = props.project[0];
  }
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const classes = useStyles();
  if (!props.authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <React.Fragment>
      <div className="project-details">
        {project ? (
          <React.Fragment>
            <div className="project-specs">
              <div
                id="overview"
                style={{
                  transform:
                    props.navActionLoaded === "overview"
                      ? "translateY(-50%) scale(1)"
                      : "translateY(-50%) scale(0)"
                }}
              >
                <Typography className={classes.projectName} variant="h3">
                  {project.name}
                </Typography>
                <Typography className={classes.projectInro} variant="h6">
                  {project.intro}
                </Typography>
              </div>
              <div
                id="desc"
                style={{
                  transform:
                    props.navActionLoaded === "desc"
                      ? "translateY(-50%) scale(1)"
                      : "translateY(-50%) scale(0)"
                }}
              >
                <Typography className={classes.projectDesc} variant="subtitle1">
                  {project.desc}
                </Typography>
              </div>

              <div
                id="tech-used"
                style={{
                  transform:
                    props.navActionLoaded === "tech-used"
                      ? "translateY(-50%) scale(1)"
                      : "translateY(-50%) scale(0)"
                }}
              >
                <List className={classes.techUsed} component="nav">
                  {project.techUsed
                    ? project.techUsed.map(tech => (
                        <ListItem button>
                          <ListItemText primary={tech} />
                        </ListItem>
                      ))
                    : null}
                </List>
              </div>
              <div
                id="qr"
                style={{
                  transform:
                    props.navActionLoaded === "qr"
                      ? "translateY(-50%) scale(1)"
                      : " translateY(-50%) scale(0)"
                }}
              >
                <Typography variant="h5">
                  This is Project's QR, Scan this to access details of the
                  project
                </Typography>

                <img className={classes.QR} src={project.img} alt="QR" />
              </div>

              <div
                id="userDetails"
                style={{
                  transform:
                    props.navActionLoaded === "userDetails"
                      ? "translateY(-50%) scale(1)"
                      : " translateY(-50%) scale(0)"
                }}
              >
                <Typography variant="h5">
                  Uploaded on: {project.dateTime}
                </Typography>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="progress-circle">
            <CircularProgress />
          </div>
        )}
      </div>

      <BottomNavigation showLabels className={classes.bottomNav}>
        <BottomNavigationAction
          className="bottomNavItem"
          label="Overview"
          value="recents"
          onClick={() => props.navAction("overview")}
        />
        <BottomNavigationAction
          className="bottomNavItem"
          label="Description"
          value="recents"
          onClick={() => props.navAction("desc")}
        />
        <BottomNavigationAction
          className="bottomNavItem"
          label="Technologies Used"
          value="recents"
          onClick={() => props.navAction("tech-used")}
        />

        <BottomNavigationAction
          className="bottomNavItem"
          label="QR"
          value="recents"
          onClick={() => props.navAction("qr")}
        />
        {/* <BottomNavigationAction
          className="bottomNavItem"
          label="User Details"
          value="recents"
          onClick={() => props.navAction("userDetails")}
        /> */}
      </BottomNavigation>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    project: state.firebase.ordered.Projects,
    navActionLoaded: state.project.navActionLoader,
    authenticated: state.auth.authenticated
    // uid: state.firebase.ordered.Projects.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navAction: navName => {
      dispatch(navActionLoader(navName));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    {
      collection: "Projects",
      doc: props.match.params.id
    },
    {
      collection: "Users",
      doc: props.uid
    }
  ])
)(ProjectDetails);
