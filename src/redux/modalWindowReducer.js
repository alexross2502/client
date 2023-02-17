const setActive = "setActive";

const defaultState = {
  isActive: false,
};

export default function modalWindowReducer(state = defaultState, action) {
  switch (action.type) {
    case setActive:
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

export const setModalActive = () => ({ type: setActive });
