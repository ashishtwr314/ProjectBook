import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import "./ProjectDetails.css";

const useStyles = makeStyles(theme => ({
    projectName: {
        fontSize: "25px",
        marginBottom: "30px"
    }
}));


const ProjectDetails = (props) => {
    const classes = useStyles();    
    return ( 
        <React.Fragment>
            <SwipeableDrawer variant="permanent" className="drawer" >
                <div className="v-center">
                    <List>
                            <ListItem>
                                <ListItemText disableTypography={true} className={classes.projectName} primary={`Project No: ${props.match.params.id}`} />
                            </ListItem>
                        {["Overview", "Front-End Techs.", "Back-End Tech", "Advice", "Reviews"].map((text, index) => (
                            <ListItem className="project-specs" button key={text}>
                                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </SwipeableDrawer>
    </React.Fragment>
            
     );
}
 
export default ProjectDetails;