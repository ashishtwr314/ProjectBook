import * as actionTypes from "./actionTypes";

export const loginSuccess = loginDetails => {
  return {
    type: actionTypes.LOGIN_SUCCESSFULL,
    loginDetails: loginDetails
  };
};

export const loginFailed = response => {
  return {
    type: actionTypes.LOGIN_FAILED,
    payload: response
  };
};

export const handleLogin = creds => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: actionTypes.LOGIN_FLAG_SETTER });

    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then(response => {
        dispatch(loginSuccess(response));
      })
      .catch(response => {
        dispatch(loginFailed(response));
      });
  };
};

export const logout = () => {
  return (dispatch, getState, extraArg) => {
    const firebase = extraArg.getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: actionTypes.LOGOUT_SUCCESS });
      });
  };
};

export const signUp = newUserDetails => {
  return (dispatch, getState, extraArg) => {
    dispatch({ type: actionTypes.SIGNUP_FLAG_SETTER });
    const firebase = extraArg.getFirebase();
    const firestore = extraArg.getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        newUserDetails.email,
        newUserDetails.password
      )
      .then(res => {
        return firestore
          .collection("users")
          .doc(res.user.uid)
          .set({
            firstName: newUserDetails.firstName,
            lastName: newUserDetails.lastName,
            email: newUserDetails.email,
            college: newUserDetails.college
          });
      })
      .then(res => {
        dispatch({ type: actionTypes.SIGNUP_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: actionTypes.SIGNUP_FAILED, error: err });
      });
  };
};

// export const getUserDetails = (uid) => {

// }
