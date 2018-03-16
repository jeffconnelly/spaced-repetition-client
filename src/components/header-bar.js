import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {showLoginForm} from '../actions/useractions';
import {showRegistrationForm} from '../actions/useractions';
import {clearAuthToken} from '../local-storage';
import './header-bar.css';


export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let currentUsername;
        let logOutButton;
        let loginFormNav;
        let regFormNav;

        if (this.props.loggedIn) {
          currentUsername = (
           <li className="current-user">Logged in as <span className="user-span">{this.props.currentUser.username}</span></li>
          );

            logOutButton = (
                <button className="red btn-logout" onClick={() => this.logOut()}>Log out</button>
            );
        }

        if (!this.props.loggedIn) {
          loginFormNav = (
            <li className="login-text" href="#" onClick={() => this.props.dispatch(showLoginForm())} >Login</li>
          );
          regFormNav = (
            <li className="login-text" href="#" onClick={() => this.props.dispatch(showRegistrationForm())}>Sign Up</li>
          );
        }
          return (
            <div className="header-bar">
              <ul className="nav-bar-ul">
               {loginFormNav}
                {regFormNav}
                {logOutButton}
                {currentUsername}
                </ul>
            </div>
        );
        }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    ShowLoginForm: state.userReducer.showLoginForm,
    ShowRegistrationForm: state.userReducer.showForm,
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(HeaderBar);