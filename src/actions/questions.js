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

// export const fetchQuestion = () => dispatch => {
//   fetch(`${API_BASE_URL}/questions/`)
//     .then(res => {
//       if (!res.ok) {
//       return Promise.reject(res.statusText);
//     }
//     return res.json();
//     })
//     .then(question => {
//       console.log(question);
//       dispatch(fetchQuestionSuccess(question[0]))
//     })
// };

export const fetchQuestion2 = id => dispatch => {
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
export const checkAnswer = input => ({
    type: CHECK_QUESTION_SUCCESS,
    input
});

//This action toggles the button to render from Check Answer to Next Question back and forth
export const TOGGLE_BTN_SUCCESS = 'TOGGLE_BTN_SUCCESS';
export const buttonToggle = () => ({
    type: TOGGLE_BTN_SUCCESS,
});

// export const buttonToggle = () => dispatch => {
//   dispatch(ToggleBtnSuccess());
// }

export const TOGGLE_BTN_SUCCESS_BACK = 'TOGGLE_BTN_SUCCESS_BACK';
export const ToggleBtnSuccessBack = () => ({
    type: TOGGLE_BTN_SUCCESS_BACK,
});

export const buttonToggleBack = (answer, id) => dispatch => {
  dispatch(ToggleBtnSuccessBack());
  dispatch(userAnswer(answer, id)); 
}

//This action will make a POST with whether the question was correct or incorrect
export const userAnswer = (answer, id) => dispatch => 
{
  console.log(answer);
  fetch(`${API_BASE_URL}/users/${id}`, {
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
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(question => {
    // console.log(question.currentQuestion.head.next.value);
    // let newQuestion = question.currentQuestion.head.value.question;
    // let newAnswer = question.currentQuestion.head.value.answer;
     dispatch(fetchQuestionSuccess(question.currentQuestion.head.next.value));
  })
}

