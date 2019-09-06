import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';

const FrontEndTech = (props) => {
    console.log(props);
    return ( 
        <React.Fragment>
            <Typography className="Section-Heading"  variant="h5" gutterBottom> Front End Technologies </Typography>
                <List component="nav" aria-label="main mailbox folders">
                    {props.frontEnd.map( (tech, i) => (
                        <ListItem key={i} button>
                            <ListItemText primary={tech} />
                        </ListItem>
                    ))}
                        
                </List>
        </React.Fragment>
     );
}
 
export default FrontEndTech;