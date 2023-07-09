import { ADD_ARTICLES, ADD_FAVOURITE, REMOVE_FAVOURITE, SET_ARTICLES } from './articles-const';

export const actionSetActicles = (data, error = false) => ({
  type: SET_ARTICLES,
  payload: data,
  error,
});
export const actionAddArticle = (data, error = false) => ({
  type: ADD_ARTICLES,
  payload: data,
  error,
});
export const actionAddFavourite = (data) => ({ type: ADD_FAVOURITE, payload: data });
export const actionRemoveFavourite = (data) => ({ type: REMOVE_FAVOURITE, payload: data });
