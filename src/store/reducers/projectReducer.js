import * as actionTypes from "../actions/actionTypes";

const initialState = {
  showCreationLoader: false,
  newlyCreatedPostId: ""
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PROJECT:
      console.log(action.newlyCreatedPostId);
      return {
        ...state,
        showCreationLoader: false,
        newlyCreatedPostId: action.newlyCreatedPostId
      };
    case actionTypes.PROJECT_CREATION_START:
      return {
        ...state,
        showCreationLoader: true
      };
    case actionTypes.ADD_ANOTHER_PROJECT:
      return {
        ...state,
        newlyCreatedPostId: false
      };
    default:
      return state;
  }
};

export default projectReducer;
