import { AnyAction } from "redux";

const setAddMasters = "setAddMasters";

const defaultState = {
  isActive: false,
};

export default function modalAddMastersReducer(
  state = defaultState,
  action: AnyAction
) {
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

export const setModalAddMasters = (props?: Boolean) => ({
  type: setAddMasters,
});
