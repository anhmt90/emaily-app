import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

/**
 * This component is supposed to hold REACT-ROUTER's stuff
 */
class App extends Component {

    /**
     * In future versions of React, componentWillMount() will be called multiple times authomatically,
     * and so by convention, component did mount is now looked upon as being the preffered location to 
     * make any type of initial Ajax requests.
     * In addition, the difference in time between didMount and willMount is essentially 0.
     */
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            /**
             * Materialize assumes the root emlement of the app is class "container"
             */
            <div className="container">
                <BrowserRouter>
                    <Header />
                    <Route path="/" component={Landing} exact />
                    <Route path="/surveys" component={Dashboard} exact />
                    <Route path="/surveys/new" component={SurveyNew} />
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);