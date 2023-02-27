const setAddReservations = "setAddReservations";

const defaultState = {
  isActive: false,
};

export default function modalAddReservationsReducer(
  state = defaultState,
  action
) {
  switch (action.type) {
    case setAddReservations:
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

export const setModalAddReservations = () => ({ type: setAddReservations });
