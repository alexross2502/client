import { AnyAction } from "redux";

const setOrder = "setOrder";

const defaultState = {
  isActive: false,
};

export default function orderReducer(state = defaultState, action: AnyAction) {
  switch (action.type) {
    case setOrder:
      if (!state.isActive) {
        return {
          ...state,
          isActive: true,
        };
      } else {
        return {
          ...state,
          isActive: false,
        };
      }

    default:
      return state;
  }
}

export const setModalOrder = (props?: Boolean) => ({ type: setOrder });
