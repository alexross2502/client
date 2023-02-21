const setAddTowns = "setAddTowns";

const defaultState = {
  isActive: false,
};

export default function modalAddTownsReducer(state = defaultState, action) {
  switch (action.type) {
    case setAddTowns:
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

export const setModalAddTowns = () => ({ type: setAddTowns });
