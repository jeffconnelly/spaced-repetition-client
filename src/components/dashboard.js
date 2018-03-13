import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import {hideLoginForm} from '../actions/useractions';
import {hideRegistrationForm} from '../actions/useractions';
import {fetchQuestion} from '../actions/questions';
import {buttonToggle} from '../actions/questions';
import {buttonToggleBack} from '../actions/questions';
import {checkAnswer} from '../actions/questions';

import './dashboard.css';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
        this.props.dispatch(hideLoginForm());
        this.props.dispatch(hideRegistrationForm());
        this.props.dispatch(fetchQuestion());
    }

    render() {
      let cardCall = this.props.currentQuestion;
      if (!this.props.buttonToggle) {
        return (
          <section className="dashboard-wrapper">
          <h1>Spaced Repetition Page</h1>
              <div className="dashboard-username">
                  Username: {this.props.username}
              </div>
              <div className="dashboard-name">Name: {this.props.name}</div>
              <div className="flashcard-wrapper">
              <h1>{cardCall}</h1>
              <form className="search-form" onSubmit = { (e) => {
                e.preventDefault();
                console.log(this.input.value);
                // this.props.dispatch(checkAnswer(this.input.value))
              }}>
              <label htmlFor="search">Answer</label>
              <input className="search-input" type="search" ref={input => (this.input = input)} />
              <button onClick={() => this.props.dispatch(buttonToggle())}
              className="search-button">Check Answer</button>
              </form>
              </div>
          </section>
      );
      }
      else if (this.props.buttonToggle) {
        return (
          <section className="dashboard-wrapper">
          <h1>Spaced Repetition Page</h1>
              <div className="dashboard-username">
                  Username: {this.props.username}
              </div>
              <div className="dashboard-name">Name: {this.props.name}</div>
              <div className="flashcard-wrapper">
              <h1>Next Question Is:</h1>
              {cardCall}
              <form className="search-form" onSubmit = { (e) => {
                e.preventDefault();
                console.log(this.input.value);
                // this.props.dispatch(fetchQuestion(this.input.value))
              }}>
              <label htmlFor="search">Answer</label>
              <input className="search-input" type="search" ref={input => (this.input = input)} />
              <button onClick={() => this.props.dispatch(buttonToggleBack())} className="search-button">Next Question</button>
              </form>
              </div>
          </section>
      );
      }
        
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    // const {question} = state.questionReducer;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        buttonToggle: state.questionReducer.btnToggle,
        currentQuestion: state.questionReducer.currentQuestion
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
// buttonToggle: state.question.btnToggle


// const mapStateToProps = state => ({
//   ShowRegistrationForm: state.userReducer.showRegistrationForm,
// });

// currentQuestion: state.questionreducer.currentQuestion;
// buttonToggle: state.questionreducer.btnToggle;

  // if (this.state.btnToggle === true) {
        // btn = <button onClick={() => this.props.dispatch(buttonToggle())} className="search-button">Next Question</button>
      // }
      // btn = <button onClick={() => this.props.dispatch(buttonToggle())}
      //   className="search-button">Check Answer</button>