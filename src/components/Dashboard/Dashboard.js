import React from 'react';
import Grid from "@material-ui/core/Grid"
import Projects from '../Projects/Projects';

const Dashboard = () => {
    return ( 
        <React.Fragment>
            <Grid justify="center" container spacing={2}>
                    <Grid item  xs={8}>
                        <Projects />
                    </Grid>

                    <Grid item  xs={4}>
                        Two
                    </Grid>
                </Grid>
        </React.Fragment>

     );
}
 
export default Dashboard;