const setRerender = "setRerender";

const defaultState = {
  isRerender: false,
};

export default function rerenderReducer(state = defaultState, action) {
  switch (action.type) {
    case setRerender:
      if (!state.isRerender) {
        return {
          ...state,
          isRerender: true,
        };
      } else {
        return {
          ...state,
          isRerender: false,
        };
      }

    default:
      return state;
  }
}

export const setPageRerender = () => ({ type: setRerender });
