const setRemoveAndAdd = "setRemoveAndAdd";

const defaultState = {
  isActive: false,
};

export default function RemoveAndAddModalReducer(state = defaultState, action) {
  switch (action.type) {
    case setRemoveAndAdd:
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

export const setRemoveAndAddModal = () => ({ type: setRemoveAndAdd });
