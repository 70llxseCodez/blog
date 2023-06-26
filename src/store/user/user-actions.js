import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, UPDATE_USER } from './user-const';

export const actionRegisterUser = (data, error = false) => ({
  type: REGISTER_USER,
  payload: data,
  error,
});
export const actionLogOutUser = () => ({ type: LOGOUT_USER });
export const actionLoginUser = (data, error = false) => ({
  type: LOGIN_USER,
  payload: data,
  error,
});
export const actionUpdateUser = (data, error = false) => ({
  type: UPDATE_USER,
  payload: data,
  error,
});
