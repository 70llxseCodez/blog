import { actionAddArticle, actionAddFavourite, actionRemoveFavourite, actionSetActicles } from './articles-actions';

export const fetchArticles = (token = false, page = 1, limit = 5) => {
  return async (dispatch) => {
    try {
      const initialOffset = (page - 1) * 5;
      if (token) {
        const res = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${initialOffset}`, {
          method: 'get',
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('Error from network');
        }
        const data = await res.json();
        dispatch(actionSetActicles(data));
      }
      const res = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${initialOffset}`);
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
      window.location.href = '/';
      dispatch(actionAddArticle(data, false));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addFavourite = (slug, token) => {
  console.log(token);
  return async (dispatch) => {
    try {
      const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method: 'post',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Error from network');
      }
      const data = await res.json();
      dispatch(actionAddFavourite(data));
    } catch (err) {
      console.log(err);
    }
  };
};
export const removeFavourite = (slug, token) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method: 'delete',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Error from network');
      }
      const data = await res.json();
      console.log(data);
      dispatch(actionRemoveFavourite(data));
    } catch (err) {
      console.log(err);
    }
  };
};
