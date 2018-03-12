import {
  SHOW_LOGIN_FORM,
  HIDE_LOGIN_FORM,
  SHOW_REGISTRATION_FORM,
  HIDE_REGISTRATION_FORM
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
    return {
      ...state,
      showLoginForm: false,
      userLoggedIn: false
    }
    case SHOW_REGISTRATION_FORM:
    console.log(action.type);
    return {
      ...state,
      showRegistrationForm: true,
      userLoggedIn: false
    }
    case HIDE_REGISTRATION_FORM:
    return {
      ...state,
      showRegistrationForm: false,
      userLoggedIn: false
    }
    default: return state;
  }
}

export default userReducer;



