import * as actionTypes from "../actions/actionTypes";

let initialState = {
  authenticated: false,
  loginGoingOn: false,
  loginError: null,
  signUpSuccess: null,
  signUpError: null,
  signUpGoingOn: false,
  uid: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESSFULL:
      console.log(action.loginDetails.user.Nb.uid);
      return {
        ...state,
        loginGoingOn: false,
        authenticated: true,
        loginError: null,
        uid: action.loginDetails.user.Nb.uid
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        loginGoingOn: false,
        authenticated: false,
        loginError: action.payload.message
      };
    case actionTypes.LOGIN_FLAG_SETTER:
      return {
        ...state,
        loginGoingOn: true
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: false
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        authenticated: true,
        signUpError: null,
        signUpGoingOn: false,
        signUpSuccess: true
      };
    case actionTypes.SIGNUP_FAILED:
      console.log(action);
      return {
        ...state,
        authenticated: false,
        signUpError: action.error.message,
        signUpGoingOn: false
      };
    case actionTypes.SIGNUP_FLAG_SETTER:
      return {
        ...state,
        signUpGoingOn: true
      };
    default:
      return state;
  }
};

export default authReducer;
