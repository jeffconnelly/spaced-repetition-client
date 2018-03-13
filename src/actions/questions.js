//All actions that deal with flashcard questions data
//from the server

// import {API_BASE_URL} from '../config';

// console.log(API_BASE_URL);


//This action fetches all the questions from the server, and will update the local state with that array of questions.
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const fetchAllQuestionsSuccess = cards => ({
    type: FETCH_QUESTIONS_SUCCESS,
    cards
});

export const fetchQuestions = card => dispatch => {

  dispatch(fetchAllQuestionsSuccess());
  // return fetch(`${API_BASE_URL}`)
  //   .then((res) => res.json());

};


//This action checks if the user input matches the answer provided
export const checkAnswer = () => dispatch => {
  
};


//

