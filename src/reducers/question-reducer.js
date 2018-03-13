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
};

export function questionReducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_QUESTION_SUCCESS:
    console.log(action.question.answer);
    return {
      ...state,
      currentQuestion: action.question.question,
      currentAnswer: action.question.answer
    }
    case CHECK_QUESTION_SUCCESS:
    if (action.input === state.currentAnswer)
    return {
      ...state,
      isCorrect: true,
    }
    else return {
      ...state,
      isCorrect: false,
    }
    case TOGGLE_BTN_SUCCESS:
    console.log(state.btnToggle);
    return {
      ...state,
      btnToggle: true,
    }
    case TOGGLE_BTN_SUCCESS_BACK:
    console.log(state.btnToggle);
    return {
      ...state,
      btnToggle: false,
    }
    default: return state;
  }
}

export default questionReducer;
