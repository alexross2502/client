const setUserData = "setUserData";

const defaultState = null;

export default function userDataReducer(state = defaultState, action) {
  console.log(action.payload);
  switch (action.type) {
    case setUserData:
      if (action.payload !== null && action.payload) {
        return {
          ...state,
          ...action.payload,
        };
      }
    default:
      return null;
  }
}

export const setUserDataReducer = (payload?) => ({
  type: setUserData,
  payload,
});
