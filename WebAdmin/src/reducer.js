export const action = {
  FETCH_USER: "FETCH_USER",
  FETCH_USER_SUCCESS: "FETCH_USER_SUCCESS",
  FETCH_CURRENT_USER: "FETCH_CURRENT_USER",
  FETCH_CURRENT_USER_SUCCESS: "FETCH_CURRENT_USER_SUCCESS",
};

export const myReducer = (state, { type, payload }) => {
  switch (type) {
    case action.FETCH_USER:
      return { ...state, isLoading: true };
    case action.FETCH_USER_SUCCESS:
      return { ...state, users: payload };
    case action.FETCH_CURRENT_USER_SUCCESS:
      console.log(payload)
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};
