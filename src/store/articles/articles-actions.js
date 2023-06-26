import { ADD_ARTICLES, SET_ARTICLES } from './articles-const';

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
