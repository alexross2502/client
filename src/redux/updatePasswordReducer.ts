const setUpdatePassword = "setUpdatePassword";

const defaultState = {
  isActive: false,
};

export default function modalUpdatePasswordReducer(
  state = defaultState,
  action
) {
  switch (action.type) {
    case setUpdatePassword:
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

export const setModalUpdatePassword = (props?: boolean) => ({
  type: setUpdatePassword,
});
