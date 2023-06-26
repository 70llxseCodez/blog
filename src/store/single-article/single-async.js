import { actionSetSingleActicles } from './single-actions';

export const fetchSingleArticle = (slug) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
      if (!res.ok) {
        throw new Error('Error from get single article');
      }
      const data = await res.json();
      dispatch(actionSetSingleActicles(data, false));
    } catch (err) {
      console.log(err);
      dispatch(actionSetSingleActicles(null, true));
    }
  };
};

export const fetchDeleteSingleArticle = async (slug, token) => {
  try {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'delete',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    window.location.href = '/';
    if (!res.ok) {
      throw new Error('Error from get single article');
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchEditSignArticle = async (slug, article, token) => {
  try {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'put',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ article }),
    });
    // window.location.href = '/'
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error('Error from get single article');
    }
  } catch (err) {
    console.log(err);
  }
};
