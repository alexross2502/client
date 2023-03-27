import { AnyAction } from "redux";

const setOrderData = "setOrderData";

const defaultState = {
  data: {},
};

export const orderDataReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case setOrderData:
      return { ...state, data: [action.payload] };
    default:
      return state;
  }
};

export const setData = (props?: any) => ({ type: setOrderData });
