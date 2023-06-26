import { SET_ARTICLE } from './single-const';

export const actionSetSingleActicles = (data, error = false) => ({
  type: SET_ARTICLE,
  payload: data,
  error,
});
