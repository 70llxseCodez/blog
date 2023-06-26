import { actionAddArticle, actionSetActicles } from './articles-actions';

export const fetchArticles = (page = 1, limit = 5) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${page}`);
      if (!res.ok) {
        throw new Error('Error from network');
      }
      const data = await res.json();
      dispatch(actionSetActicles(data));
    } catch (err) {
      dispatch(actionSetActicles(null, true));
      console.log(err);
    }
  };
};
export const fetchAddArticle = (article, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch('https://blog.kata.academy/api/articles', {
        method: 'post',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article }),
      });
      if (!res.ok) {
        throw new Error('Error from network');
      }
      const data = await res.json();
      console.log(data);
      dispatch(actionAddArticle(data, false));
    } catch (err) {
      console.log(err);
    }
  };
};
