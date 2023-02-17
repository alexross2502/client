const setAuthorization = "setAuthorization";

const defaultState = {
  isAuthorized: false,
};

export default function authorizationReducer(state = defaultState, action) {
  switch (action.type) {
    case setAuthorization:
      if (!state.isAuthorized) {
        return {
          ...state,
          isAuthorized: true,
        };
      }

    default:
      return state;
  }
}

export const setAuthorized = () => ({ type: setAuthorization });
