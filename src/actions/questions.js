//All actions that deal with flashcard questions data
//from the server

import {API_BASE_URL} from '../config';

// console.log(API_BASE_URL);
//This action fetches a question from the server, and will update the local state with that array of questions.
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = question => ({
    type: FETCH_QUESTION_SUCCESS,
    question
});

export const fetchQuestion = () => dispatch => {
  fetch(`${API_BASE_URL}/questions/`)
    .then(res => {
      if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
    })
    .then(question => {
      console.log(question);
      dispatch(fetchQuestionSuccess(question[0]))
    })
};

export const fetchQuestion2 = id => dispatch => {
  console.log(id);
  fetch(`${API_BASE_URL}/users/${id}/current`)
    .then(res => {
      if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
    })
    .then(question => {
      console.log(question);
      dispatch(fetchQuestionSuccess(question.value))
    })
};

//This action checks if the user input matches the answer provided
export const CHECK_QUESTION_SUCCESS = 'CHECK_QUESTION_SUCCESS';
export const CheckQuestionsSuccess = input => ({
    type: CHECK_QUESTION_SUCCESS,
    input
});

export const checkAnswer = input => dispatch => {
  dispatch(CheckQuestionsSuccess(input))
};

//This action toggles the button to render from Check Answer to Next Question back and forth
export const TOGGLE_BTN_SUCCESS = 'TOGGLE_BTN_SUCCESS';
export const ToggleBtnSuccess = () => ({
    type: TOGGLE_BTN_SUCCESS,
});

export const buttonToggle = () => dispatch => {
  dispatch(ToggleBtnSuccess());
}

export const TOGGLE_BTN_SUCCESS_BACK = 'TOGGLE_BTN_SUCCESS_BACK';
export const ToggleBtnSuccessBack = () => ({
    type: TOGGLE_BTN_SUCCESS_BACK,
});

export const buttonToggleBack = answer => dispatch => {
  dispatch(ToggleBtnSuccessBack());
  // console.log(answer);
  dispatch(userAnswer(answer)); 
}

//This action will make a POST with whether the question was correct or incorrect
export const userAnswer = (answer) => dispatch => 
{
  // console.log(answer);
  //This is a mockup of the new GET dispatch we will make to get a new word in this action, 
  //after our POST method returns a the new vocab word
  fetch(`${API_BASE_URL}/users/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
     },
     body: JSON.stringify({
      isCorrect: answer
    }),
  })
  .then(res => {
  dispatch(fetchQuestionSuccess({_id: "5aa81505734d1d6b71206501", question: "Hola", answer: "hello"}));
    console.log(res)
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
}

