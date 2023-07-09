import { ADD_ARTICLES, ADD_FAVOURITE, REMOVE_FAVOURITE, SET_ARTICLES } from './articles-const';

const initialState = {
  articles: null,
  error: false,
};

export const articleReducer = (state = initialState, action) => {
  if (action.type === SET_ARTICLES) {
    return {
      error: action.error,
      articles: action.payload,
    };
  } else if (action.type == ADD_ARTICLES) {
    return {
      articles: state.articles,
      error: action.error,
    };
  } else if (action.type === ADD_FAVOURITE) {
    const obj = state.articles.articles.find((item) => item.slug === action.payload.article.slug);
    const index = state.articles.articles.indexOf(obj);
    console.log(action.payload);
    return {
      ...state,
      articles: {
        ...state.articles,
        articles: [
          ...state.articles.articles.slice(0, index),
          action.payload.article,
          ...state.articles.articles.slice(index + 1),
        ],
      },
    };
  } else if (action.type === REMOVE_FAVOURITE) {
    const obj = state.articles.articles.find((item) => item.slug === action.payload.article.slug);
    const index = state.articles.articles.indexOf(obj);
    return {
      ...state,
      articles: {
        ...state.articles,
        articles: [
          ...state.articles.articles.slice(0, index),
          action.payload.article,
          ...state.articles.articles.slice(index + 1),
        ],
      },
    };
  } else {
    return state;
  }
};
