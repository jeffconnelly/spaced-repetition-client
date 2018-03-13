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
  fetch(`${API_BASE_URL}/questions`)
    .then(res => {
      if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
    })
    .then(question => {
      console.log(question);
      dispatch(fetchQuestionSuccess(question))
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


//This action will make a POST with whether the question was correct or incorrect


// State with question and answer
// Is correct variable in state as well

// Is correct === true , or is correct === false
// 
//Send is correct boolean to backend

//In Post -> 

//insertLast()

// insertLast(question)

// ll.head

// if(isCorrect) mValue = * 2

// else mValue = 1

// insertAt(mValue, question)

//Send true or false -> to POST endpoint?

//Then click another button to grab next question at /questions/next -> retrieve new this.head