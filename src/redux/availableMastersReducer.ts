import { AnyAction } from "redux";

const setAvailableMasters = "setAvailableMasters";

const defaultState = {
  masters: [],
};

export const availableMastersReducer = (
  state = defaultState,
  action: AnyAction
) => {
  switch (action.type) {
    case setAvailableMasters:
      return { ...state, masters: [action.payload] };
    default:
      return state;
  }
};

export const setMasters = (props?: any) => ({ type: setAvailableMasters });
