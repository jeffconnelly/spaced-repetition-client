import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import {hideLoginForm} from '../actions/useractions';
import {hideRegistrationForm} from '../actions/useractions';
// import {fetchQuestion} from '../actions/questions';
import {fetchQuestion2} from '../actions/questions';
import {buttonToggle} from '../actions/questions';
import {buttonToggleBack} from '../actions/questions';
import {checkAnswer} from '../actions/questions';

import './dashboard.css';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
        this.props.dispatch(hideLoginForm());
        this.props.dispatch(hideRegistrationForm());
        // this.props.dispatch(fetchQuestion());
        this.props.dispatch(fetchQuestion2(this.props.userId));
    }

    render() {
      // console.log('is correct render', this.props.isCorrect);
      // console.log('is correct feedback', this.props.answerFeedback);
      // console.log('is correct feedback', this.props.answerFeedback);
      // console.log('user id is: ', this.props.userId);
      let cardCall = this.props.currentQuestion;
      let questionFeedback = this.props.answerFeedback;
      // console.log(questionFeedback);
      
        if (!this.props.buttonToggle) {
        return (
          <section className="dashboard-wrapper">
              <div className="flashcard-wrapper">
              <h1 className="card-header">{cardCall}</h1>
              <form className="search-form" onSubmit = { (e) => {
                e.preventDefault();
                this.props.dispatch(checkAnswer(this.input.value));
                this.props.dispatch(buttonToggle());
              }}>
              <label className="answer-label"htmlFor="search">Translation:</label>
              <input className="search-input" type="search" ref={input => (this.input = input)} />
              <button type="submit" className="search-button btn-gradient orange">Check Answer</button>
              </form>
              </div>
          </section>
      );
      }
      else if (this.props.buttonToggle) {
        return (
          <section className="dashboard-wrapper">
              <div className="flashcard-wrapper">
              <h1 className="card-header">{questionFeedback}</h1>
              <form className="search-form next-form" onSubmit = { (e) => {
                e.preventDefault();
                console.log(this.input.value);
              }}>
              <button  type="button" onClick={() => this.props.dispatch(buttonToggleBack(this.props.isCorrect))} className="search-button btn-gradient orange next">Next Question</button>
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
        userId: state.auth.currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        buttonToggle: state.questionReducer.btnToggle,
        currentQuestion: state.questionReducer.currentQuestion,
        isCorrect: state.questionReducer.isCorrect,
        answerFeedback: state.questionReducer.answerFeedback
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
// currentQuestion: state.questionreducer.currentQuestion;
// buttonToggle: state.questionreducer.btnToggle;