import { AnyAction } from "redux";

const setRerender = "setRerender";

const defaultState = {
  isRerender: false,
};

export default function rerenderReducer(
  state = defaultState,
  action: AnyAction
) {
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

export const setPageRerender = (props?: Boolean) => ({ type: setRerender });
