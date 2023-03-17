const setOrderData = "setOrderData";

const defaultState = {
  data: {
    recipient: null,
    day: null,
    size: null,
    master_id: null,
    towns_id: null,
    clientName: null,
  },
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
