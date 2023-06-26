import { SET_ARTICLE } from './single-const';

const initialState = {
  error: false,
  singleArticle: null,
};

export const singleArticleReduer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLE:
      return {
        error: action.error,
        singleArticle: action.payload,
      };
    default:
      return state;
  }
};
