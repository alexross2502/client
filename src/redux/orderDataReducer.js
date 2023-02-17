const setOrderData = "setOrderData";

const defaultState = {
  data: ['', '', '', '', '', '', '', ''],
};

export const orderDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case setOrderData:
      return { ...state, data: [action.payload] };
    default:
      return state;
  }
};

export const setData = () => ({ type: setOrderData });
