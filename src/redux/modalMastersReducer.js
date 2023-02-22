const setMasters = "setMasters";

const defaultState = {
  isActive: false,
};

export default function modalMastersReducer(state = defaultState, action) {
  switch (action.type) {
    case setMasters:
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

export const setModalMasters = () => ({ type: setMasters });
