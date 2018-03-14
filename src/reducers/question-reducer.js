import {
  FETCH_QUESTION_SUCCESS,
  CHECK_QUESTION_SUCCESS,
  TOGGLE_BTN_SUCCESS,
  TOGGLE_BTN_SUCCESS_BACK,
} from '../actions/questions';

import {
  CLEAR_AUTH
} from '../actions/auth';

const initialState = {
  isCorrect: 'false',
  currentQuestion: null,
  currentAnswer: null,
  btnToggle: false,
  answerFeedback: null,
  questionCorrect: 0,
  questionTotal: 10
};

export function questionReducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_QUESTION_SUCCESS:
    // console.log(state.btnToggle);
    // console.log(action.question);
    // console.log(state.currentQuestion);
    return {
      ...state,
      currentQuestion: action.question.question,
      currentAnswer: action.question.answer,
    }
    case CHECK_QUESTION_SUCCESS:
    // console.log('input is: ', action.input);
    // console.log('correct answer is: ', state.currentAnswer)
    // console.log('action: ', action.input);
    // console.log('currentAnswer', state.currentAnswer);
    console.log(state.questionCorrect);
    if (action.input === state.currentAnswer) {
      state.questionCorrect++;
      return {
        ...state,
        isCorrect: 'true',
        answerFeedback: 'Correct!',
      }
    }
    else return {
      ...state,
      isCorrect: 'false',
      answerFeedback: 'Incorrect!'
    }
    case TOGGLE_BTN_SUCCESS:
    console.log('is Correct now: ');
    return {
      ...state,
      btnToggle: true,
      currentQuestion: null,
      currentAnswer: null,
    }
    case TOGGLE_BTN_SUCCESS_BACK:
    // console.log(state.btnToggle);
    return {
      ...state,
      btnToggle: false,
      currentQuestion: null,
      currentAnswer: null,
    }
    case CLEAR_AUTH:
    return {
      ...state,
      currentQuestion: null,
      currentAnswer: null,
      isCorrect: null,
      questionCorrect: 0,
    }
    default: return state;
  }
}

export default questionReducer;


// btnToggle: !state.btnToggle
