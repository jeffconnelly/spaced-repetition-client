import {
  FETCH_QUESTION_SUCCESS,
  CHECK_QUESTION_SUCCESS,
  TOGGLE_BTN_SUCCESS,
  TOGGLE_BTN_SUCCESS_BACK
} from '../actions/questions';

const initialState = {
  isCorrect: null,
  currentQuestion: null,
  currentAnswer: null,
  btnToggle: false,
  answerFeedback: null
};

export function questionReducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_QUESTION_SUCCESS:
    console.log(state.btnToggle);
    return {
      ...state,
      currentQuestion: action.question.question,
      currentAnswer: action.question.answer,
    }
    case CHECK_QUESTION_SUCCESS:
    // console.log('input is: ', action.input);
    // console.log('correct answer is: ', state.currentAnswer)
    if (action.input === state.currentAnswer)
    return {
      ...state,
      isCorrect: true,
      answerFeedback: 'Correct!'
    }
    else return {
      ...state,
      isCorrect: false,
      answerFeedback: 'Incorrect!'
    }
    case TOGGLE_BTN_SUCCESS:
    // console.log(state.btnToggle);
    return {
      ...state,
      btnToggle: true,
    }
    case TOGGLE_BTN_SUCCESS_BACK:
    // console.log(state.btnToggle);
    return {
      ...state,
      btnToggle: false,
    }
    default: return state;
  }
}

export default questionReducer;


// btnToggle: !state.btnToggle
