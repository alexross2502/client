const setAddMasters = "setAddMasters";

const defaultState = {
  isActive: false,
};

export default function modalAddMastersReducer(state = defaultState, action) {
  switch (action.type) {
    case setAddMasters:
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

export const setModalAddMasters = () => ({ type: setAddMasters });
