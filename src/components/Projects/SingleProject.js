import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import "./SingleProject.css";

const SingleProject = props => {
  return (
    <Card className="card">
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.intro}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          <Link to={`/projects/${props.id}`}>Learn More</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default SingleProject;
