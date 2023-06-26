import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, UPDATE_USER } from './user-const';

const initialState = {
  user: null,
  error: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        user: action.payload,
        error: action.error,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };
    case LOGIN_USER:
      return {
        error: action.error,
        user: action.payload,
      };
    case UPDATE_USER:
      if (action.error) {
        return {
          ...state,
        };
      }
      return {
        error: action.error,
        user: action.payload,
      };
    default:
      return state;
  }
};
