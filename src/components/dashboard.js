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
        this.props.dispatch(fetchQuestion(this.props.userId));
    }

    render() {
      let correctPercent = this.props.questionCorrect * 100;
      let totalPercent = this.props.questionTotal * 100;
      let scorePercent = this.props.score * 100;
      let attemptPercent = this.props.attempted * 100;

      let indivQuestionPercent;
      let percentWord;
      let percentString;
      if (this.props.attempted !== 0) {
        percentWord = 'Word Accuracy: '
        indivQuestionPercent = Math.round((scorePercent / attemptPercent) * 100);
        percentString = '%'
      }

      let percentResult;
      if (totalPercent) {
        percentResult = Math.round((correctPercent / totalPercent) * 100);
      }
   
      let cardCall = this.props.currentQuestion;
      let questionFeedback = this.props.answerFeedback;
      let incorrectFeedback;
      let correctAnswerFeedback;
      let formRender;

      if (this.props.answerFeedback === 'Correct!') {
        formRender = (
          <form className="search-form next-form correct-form" onSubmit = { (e) => {
            e.preventDefault();
          }}>
          <button type="button" onClick={() => this.props.dispatch(buttonToggleBack(this.props.isCorrect, this.props.userId))} className="search-button btn-gradient orange next">Next Question</button>
          </form>
        );
      }

      if (this.props.answerFeedback === 'Incorrect!') {
        incorrectFeedback = 'Youll see this question more often';
        correctAnswerFeedback = (
          <h2 className="light-header">Correct answer: <span>{this.props.currentAnswer}</span></h2>
        );
        formRender = (
          <form className="search-form next-form" onSubmit = { (e) => {
            e.preventDefault();
          }}>
          <button type="button" onClick={() => this.props.dispatch(buttonToggleBack(this.props.isCorrect, this.props.userId))} className="search-button btn-gradient orange next">Next Question</button>
          </form>
        );
     
      }

        if (!this.props.buttonToggle) {
        return (
          <section className="dashboard-wrapper">
              <div className="flashcard-wrapper">
              <div className="counter-wrapper">
              <li>Total accuracy: {percentResult}% </li>
              </div>
              <h1 className="card-header">{cardCall}</h1>
              {percentWord}{indivQuestionPercent}{percentString}
              <form className="search-form" onSubmit = { (e) => {
                e.preventDefault();
                this.props.dispatch(checkAnswer(this.input.value));
                this.props.dispatch(buttonToggle(this.props.isCorrect));
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
                {correctAnswerFeedback}
                <h3 className="light-header">{incorrectFeedback}</h3>
                { formRender}
                </div>
            </section>
      );
      }  
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        userId: state.auth.currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        buttonToggle: state.questionReducer.btnToggle,
        currentQuestion: state.questionReducer.currentQuestion,
        isCorrect: state.questionReducer.isCorrect,
        answerFeedback: state.questionReducer.answerFeedback,
        questionCorrect: state.questionReducer.questionCorrect,
        questionTotal: state.questionReducer.questionTotal,
        score: state.questionReducer.score,
        attempted: state.questionReducer.attempted,
        currentAnswer: state.questionReducer.currentAnswer
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
