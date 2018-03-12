import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Header from './header';
import Dashboard from './dashboard';
import Modal from './modal.js';
import Vector from './vector.js';
import RegistrationPage from './registration-page';
import {refreshAuthToken} from '../actions/auth';

export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {

      if (this.props.loggedIn !== true) {
        return (
          <div className="app">
              <HeaderBar />
              <Modal />
              <Header />
              <Route exact path="/" component={LandingPage} />
          </div>
      );
      }
      else {
        return (
          <div className="app">
            <HeaderBar />
            <Dashboard />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
      );
    }
  }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));


//Route to registration page - taken off for now in favor of modal render of registration form
// <Route exact path="/register" component={RegistrationPage} />



// <Vector />


// <Route exact path="/dashboard" component={Dashboard} />
