import {
  SHOW_LOGIN_FORM,
  HIDE_LOGIN_FORM,
} from '../actions/useractions';


const initialState = {
  showLoginForm: false,
  showRegistrationForm: false,
  userLoggedIn: false,
};


export function userReducer(state=initialState, action) {
  switch (action.type) {
    case SHOW_LOGIN_FORM:
    return {
      ...state,
      showLoginForm: true,
      userLoggedIn: false
    }
    case HIDE_LOGIN_FORM:
    console.log(action);
    return {
      ...state,
      showLoginForm: false,
      userLoggedIn: false
    }

    default: return state;
  }
}

export default userReducer;



