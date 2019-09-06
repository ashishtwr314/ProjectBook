import * as actionTypes from "./actionTypes";

export const projectCreationStart = () => {
  return {
    type: actionTypes.PROJECT_CREATION_START
  };
};

export const createProjectHelper = id => {
  return {
    type: actionTypes.CREATE_PROJECT,
    newlyCreatedPostId: id
  };
};

export const createProject = projectDetails => {
  return (dispatch, getState, extraArg) => {
    const firestore = extraArg.getFirestore();

    firestore
      .collection("Projects")
      .add({
        ...projectDetails
      })
      .then(success => {
        dispatch(createProjectHelper(success.id));
      })
      .catch(err => {
        console.log(err);
        // dispatch(createProjectHelper(0, err));
      });
  };
};

export const QRupload = (id, img) => {
  return (dispatch, getState, extraArg) => {
    console.log("Action me pahuch gaya");
    const firestore = extraArg.getFirestore();

    firestore
      .collection("Projects")
      .doc(id)
      .update({
        img: img
      })
      .then(success => {
        console.log("Image succesfully Uploaded");
      });
  };
};
