import React from "react";
import SingleProject from "./SingleProject";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { CircularProgress, Snackbar, SnackbarContent } from "@material-ui/core";

const Projects = props => {
  return (
    <React.Fragment>
      {props.signUpSuccess
        ? null
        : // TODO: Add a Snackbar with CLose option her

          // <Snackbar
          //   anchorOrigin={{
          //     vertical: "bottom",
          //     horizontal: "left"
          //   }}
          //   open={true}
          //   autoHideDuration={3000}
          // >
          //   <SnackbarContent
          //     className="snackbar-success"
          //     test
          //     message="LogIn Successfull"
          //   />
          // </Snackbar>
          null}
      {props.projects ? (
        props.projects.map(projectDetails => (
          <SingleProject
            key={projectDetails.id}
            id={projectDetails.id}
            name={projectDetails.name}
            intro={projectDetails.intro}
          />
        ))
      ) : (
        <div className="progress-circle">
          <CircularProgress />
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    projects: state.firebase.ordered.Projects,
    signUpSuccess: state.auth.signUpSuccess
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Projects" }])
)(Projects);
