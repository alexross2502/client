import { AnyAction } from "redux";

const setAuthorization = "setAuthorization";

const defaultState = {
  isAuthorized: false,
};

export default function authorizationReducer(
  state = defaultState,
  action: AnyAction
) {
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

export const setAuthorized = (props?: Boolean) => ({ type: setAuthorization });
