const setRegistrationModal = "setRegistrationModal";

const defaultState = {
  isActive: true,
};

export default function registrationModalReducer(state = defaultState, action) {
  switch (action.type) {
    case setRegistrationModal:
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

export const setRegistrationModalReducer = (props?: boolean) => ({
  type: setRegistrationModal,
});
