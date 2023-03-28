const setRemoveAndAddError = "setRemoveAndAddError";

const defaultState = {
  isActive: false,
};

export default function RemoveAndAddModalErrorReducer(
  state = defaultState,
  action
) {
  switch (action.type) {
    case setRemoveAndAddError:
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

export const setRemoveAndAddModalError = (props?: boolean) => ({
  type: setRemoveAndAddError,
});
