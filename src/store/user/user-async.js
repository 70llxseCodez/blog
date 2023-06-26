import { actionLoginUser, actionRegisterUser, actionUpdateUser } from './user-actions';

export const fetchRegisterUser = (userObj) => {
  console.log(userObj);
  return async (dispatch) => {
    try {
      const res = await fetch('https://blog.kata.academy/api/users', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: userObj }),
      });
      const data = await res.json();
      dispatch(actionRegisterUser(data.user, false));
    } catch (err) {
      console.log(err);
      dispatch(actionRegisterUser(null, true));
    }
  };
};

export const fetchLoginUser = (userObj) => {
  return async (dispatch) => {
    try {
      const res = await fetch('https://blog.kata.academy/api/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: userObj }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(actionLoginUser(data.user, false));
      window.location.href = '/';
    } catch (err) {
      console.log(err);
      dispatch(actionLoginUser(null, true));
    }
  };
};

export const fetchUpdateProfile = (userObj) => {
  return async (dispatch) => {
    try {
      const res = await fetch('https://blog.kata.academy/api/user', {
        method: 'put',
        headers: {
          Authorization: `Token ${userObj.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userObj }),
      });
      const data = await res.json();
      dispatch(actionUpdateUser(data.user, false));
      alert('your changes is success');
    } catch (err) {
      alert('something went wrong');
      dispatch(actionUpdateUser(null, true));
    }
  };
};
