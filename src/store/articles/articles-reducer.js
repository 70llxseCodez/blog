import { ADD_ARTICLES, SET_ARTICLES } from './articles-const';

const initialState = {
  articles: null,
  error: false,
};

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        error: action.error,
        articles: action.payload,
      };
    case ADD_ARTICLES:
      return {
        articles: state.articles,
        error: action.error,
      };
    default:
      return state;
  }
};
