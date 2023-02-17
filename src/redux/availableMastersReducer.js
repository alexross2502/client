const setAvailableMasters = "setAvailableMasters";

const defaultState = {
  masters: [],
};

export const availableMastersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case setAvailableMasters:
      return { ...state, masters: [action.payload] };
    default:
      return state;
  }
};

export const setMasters = () => ({ type: setAvailableMasters });
