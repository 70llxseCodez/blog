import { combineReducers } from 'redux';

import { articleReducer } from './articles/articles-reducer';
import { singleArticleReduer } from './single-article/single-reducer';
import { userReducer } from './user/user-reducer';

export const rootReducer = combineReducers({
  articles: articleReducer,
  singleArticle: singleArticleReduer,
  user: userReducer,
});
