import { AnyAction } from "redux";

const setDelete = "setDelete";

const defaultState = {
  isActive: false,
};

export default function modalDeleteReducer(
  state = defaultState,
  action: AnyAction
) {
  switch (action.type) {
    case setDelete:
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

export const setModalDelete = (props?: Boolean) => ({ type: setDelete });
