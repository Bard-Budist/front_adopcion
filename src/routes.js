//Import dependences
import { Switch, Redirect, Route } from 'react-router-dom';
import { 
    register as RegisterView, 
    home as HomeView , 
    login as LoginView,
    blog as BlogView,
    posting as CreatePosting } from "./view"

import React from 'react';

/**
 * create a functional object for route control
 * Routes
 *      / ro redirect /login
 *      /login
 *      /inbox
 *      /not-found
 */
const Routes = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/home" />
                <Route path="/register" component={RegisterView}/>
                <Route path="/home" component={HomeView}/>
                <Route path="/login" component={LoginView}/>
                <Route path="/blog" component={BlogView}/>
                <Route path="/posting/create" component={CreatePosting}/>
            <Redirect to="/not-found" />
        </Switch>
    )
}

//Export that
export default Routes;