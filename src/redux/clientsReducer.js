const setAddClients = "setAddClients";

const defaultState = {
  isActive: false,
};

export default function modalAddClientsReducer(state = defaultState, action) {
  switch (action.type) {
    case setAddClients:
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

export const setModalAddClients = () => ({ type: setAddClients });
