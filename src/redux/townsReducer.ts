import { AnyAction } from "redux";

const setAddTowns = "setAddTowns";

const defaultState = {
  isActive: false,
};

export default function modalAddTownsReducer(
  state = defaultState,
  action: AnyAction
) {
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

export const setModalAddTowns = (props?: Boolean) => ({ type: setAddTowns });
