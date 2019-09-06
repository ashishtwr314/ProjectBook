import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import "./ProjectDetails.css";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Overview from './ProjectDetailsSection/Overview';
import FrontEndTech from "../../components/ProjectDetails/ProjectDetailsSection/FrontEndTech";
import BackEndTech from "../../components/ProjectDetails/ProjectDetailsSection/BackEndTech";
import Advice from "../../components/ProjectDetails/ProjectDetailsSection/Advice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BottomNavigationAction, BottomNavigation, Typography, CircularProgress } from '@material-ui/core';
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";


const useStyles = makeStyles(theme => ({
    projectName: {
        fontSize: "25px",
        marginBottom: "30px"
    },
    bottomNav: {
        backgroundColor: theme.palette.primary.dark,
        color: "#fff",
        marginTop: "50px"

    },
    projectHeading: {
        marginBottom: "100px"
    }
}));


const ProjectDetails = (props) => {
    let project = null;
    if(props.project){
        project = props.project[0] 
    }
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
      

    const classes = useStyles();    
    return ( 
        <React.Fragment>

            <div className="project-details">
                {project ? 
                   ( <React.Fragment>
                        <Typography className={classes.projectHeading}  variant="h4" align="center" gutterBottom> {project.name} </Typography>
                        <Slider className="slider" {...settings}>
                            <div>
                                <Overview  desc={project.desc} />
                            </div>

                            <div>
                                <FrontEndTech frontEnd={project.frontEnd} />
                            </div>

                            <div>
                                <BackEndTech backEnd={project.backEnd} />
                            </div>

                            <div>
                                <Advice />
                            </div>

                        </Slider>  
                    </React.Fragment> )           

                :  <div className="progress-circle">  <CircularProgress /> </div>}
    
            </div>

            <BottomNavigation showLabels className={classes.bottomNav}>
                <BottomNavigationAction className="bottomNavItem" label="Overview" value="recents" />
                <BottomNavigationAction className="bottomNavItem" label="Front End" value="recents" />
                <BottomNavigationAction className="bottomNavItem" label="Back End" value="recents" />
                <BottomNavigationAction className="bottomNavItem" label="Advice" value="recents" />
            </BottomNavigation>
    </React.Fragment>
            
     );
}
 
const mapStateToProps = (state) => {
    return{
        project: state.firebase.ordered.Projects
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect( (props) => [
        {
            collection: "Projects",
            doc: props.match.params.id
        } 
    ])
)(ProjectDetails);