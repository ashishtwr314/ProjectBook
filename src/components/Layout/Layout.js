import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import AuthSingup from '../Auth/AuthSignup';
import AuthLogin from '../Auth/AuthLogin';
import Container from  "@material-ui/core/Container"
import ProjectDetails from '../ProjectDetails/ProjectDetails';

class Layout extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <Navbar />
                <Container style={{marginTop: '50px'}} maxWidth="lg">
                    <Switch> 

                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/signup" component={AuthSingup} />
                        <Route exact path="/login" component={AuthLogin} />
                        <Route exact path="/projects/:id" component={ProjectDetails} />
                    </Switch>
                </Container>
                    
            </React.Fragment>
         );
    }
}
 
export default Layout;