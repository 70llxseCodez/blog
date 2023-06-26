import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../store/user/user-selector';
import { actionLogOutUser } from '../../store/user/user-actions';

import style from './Header.module.scss';

const Header = () => {
  const { user } = useSelector(getUser);
  const dispatch = useDispatch();
  const logOut = () => dispatch(actionLogOutUser());
  return (
    <header className={style.header}>
      <div className={style.header__logo}>
        <Link to={'/'}>Realworld Blog</Link>
      </div>
      {!user ? (
        <section className={style.header__signSide}>
          <Link to={'/signin'} className={style.header__signIn}>
            <p>Sign In</p>
          </Link>
          <Link to={'/signup'} className={style.header__signUp}>
            <p>Sign Up</p>
          </Link>
        </section>
      ) : (
        <section style={{ display: 'flex', alignItems: 'center' }} className={style.header__signSide}>
          <Link to={'/new-article'} className={style.header__signUp}>
            <p>Create article</p>
          </Link>
          <Link to={'/profile'} style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '10px' }}>{user.username}</p>
            <img
              className={style.header__profileImg}
              src={!user.image ? 'https://static.productionready.io/images/smiley-cyrus.jpg' : user.image}
              alt="profile"
            />
          </Link>
          <Link
            onClick={logOut}
            style={{
              border: '1px solid #000',
              borderRadius: '5px',
              padding: '10px',
            }}
            to={'/'}
            className={style.header__signIn}
          >
            <p>Log Out</p>
          </Link>
        </section>
      )}
    </header>
  );
};

export default Header;
