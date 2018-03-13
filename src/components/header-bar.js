import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {showLoginForm } from '../actions/useractions';
import {showRegistrationForm} from '../actions/useractions';
import {clearAuthToken} from '../local-storage';
import './header-bar.css';


export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
      console.log(this.props.showRegistrationForm);
        // Only render the log out button if we are logged in
        let logOutButton;
        let loginFormNav;
        let regFormNav;

        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
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
                </ul>
            </div>
        );
        }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    ShowLoginForm: state.userReducer.showLoginForm,
    ShowRegistrationForm: state.userReducer.showForm,
});

export default connect(mapStateToProps)(HeaderBar);


              // <li className="app-name-li">Luz</li>
