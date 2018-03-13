import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import {hideLoginForm} from '../actions/useractions';
import {hideRegistrationForm} from '../actions/useractions';
import {fetchQuestion} from '../actions/questions';

import './dashboard.css';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
        this.props.dispatch(hideLoginForm());
        this.props.dispatch(hideRegistrationForm());
        this.props.dispatch(fetchQuestion());
    }

    render() {

      let cardCall = 'Card will render in this variable';

        return (
            <section className="dashboard-wrapper">
            <h1>Spaced Repetition Page</h1>
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="flashcard-wrapper">
                <h1>Flashcard Box</h1>
                {cardCall}
                <form className="search-form" onSubmit = { (e) => {
                  e.preventDefault();
                  console.log(this.input.value);
                  // this.props.dispatch(fetchCard(this.input.value))
                }}>
                <label htmlFor="search">Search</label>
                <input className="search-input" type="search" ref={input => (this.input = input)} />
                <button className="search-button">Check Answer</button>
                </form>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));



// <input className="search-input" type="search" ref={input => (this.input = input)} />