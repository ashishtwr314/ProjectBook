import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';

const BackEndTech = (props) => {
    console.log(props);
    return ( 
        <React.Fragment>
            <Typography className="Section-Heading"  fontWeight="900" variant="h5" align="center" gutterBottom> Back  End Technologies </Typography>
            <List component="nav" aria-label="main mailbox folders">
                    {props.backEnd ? props.backEnd.map( (tech,i) => (
                        <ListItem key={i} button>
                            <ListItemText primary={tech} />
                        </ListItem>
                    )): (
                        <Typography variant="h6" align="center">No Backend Technologies Used</Typography>
                    )}
                        
                </List>
        </React.Fragment>
     );
}
 
export default BackEndTech;