import React, { Component } from "react";
import { Link } from "react-router-dom";
import MUILink from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import QRCode from "qrcode.react";
import { connect } from "react-redux";
import { QRupload } from "../../store/actions/projectActions";
// import * as actionTypes from "../../store/actions/actionTypes";

class ProjectCreated extends Component {
  componentDidMount = () => {
    const img = document
      .getElementById(this.props.newlyCreatedPostId)
      .toDataURL();

    this.props.QRupload(this.props.newlyCreatedPostId, img);
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="h5" align="center">
          Your project has been successfully submitted
        </Typography>
        <div className="QR">
          <QRCode
            id={this.props.newlyCreatedPostId}
            value={`https://projectbook.netlify.com/projects/${this.props.newlyCreatedPostId}`}
          />
        </div>
        <div className="back-links">
          <Link to={"/"}>Go Home</Link>
          <Link to={"/create"} onClick={this.props.addAnotherProject}>
            Make another Project
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    QRupload: (id, img) => dispatch(QRupload(id, img))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProjectCreated);
