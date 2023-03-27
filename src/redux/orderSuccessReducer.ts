import { AnyAction } from "redux";

const setOrderSuccess = "setOrderSuccess";

const defaultState = {
  isActive: false,
};

export default function orderSuccessReducer(
  state = defaultState,
  action: AnyAction
) {
  switch (action.type) {
    case setOrderSuccess:
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

export const setOrderSuccessReducer = (props?: Boolean) => ({
  type: setOrderSuccess,
});
