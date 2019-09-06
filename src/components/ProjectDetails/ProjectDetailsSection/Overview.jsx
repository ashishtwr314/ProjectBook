import React from 'react';
import { Typography } from '@material-ui/core';

const Overview = (props) => {
    return ( 
        <React.Fragment>
             <Typography className="Section-Heading"  variant="h5" gutterBottom> Overview </Typography>
                <Typography variant="body1" gutterBottom>
                    {props.desc}
                </Typography>
        </React.Fragment>
     );
}
 
export default Overview;