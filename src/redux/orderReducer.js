const setOrder = "setOrder";

const defaultState = {
  isActive: false,
};

export default function orderReducer(state = defaultState, action) {
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

export const setModalOrder = () => ({ type: setOrder });
