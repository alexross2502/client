const setOrderSuccess = "setOrderSuccess";

const defaultState = {
  isActive: false,
};

export default function orderSuccessReducer(state = defaultState, action) {
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

export const setOrderSuccessReducer = () => ({ type: setOrderSuccess });
