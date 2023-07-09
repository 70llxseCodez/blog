import React, { useCallback } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addFavourite, removeFavourite } from '../../store/articles/articles-async';

import style from './Articles.module.scss';
import heartIcon from './../../icons/heart.svg';
import activeHeartIcon from './../../icons/activeHeart.svg';

const Articles = (props) => {
  const { title, description, createdAt, tagList, favorited, favoritesCount, author, slug } = props;
  const dispatch = useDispatch();
  const { user } = JSON.parse(localStorage.getItem('state'));

  const addFav = useCallback(() => {
    if (!favorited) {
      sessionStorage.setItem(slug, true);

      dispatch(addFavourite(slug, user.user.token));
    } else {
      sessionStorage.setItem(slug, false);

      dispatch(removeFavourite(slug, user.user.token));
    }
  }, [slug, favorited]);
  return (
    <article className={style.article}>
      <div className={style.article__title}>
        <div className={style.article__left}>
          <div className={style.article__text}>
            <h3 style={{ maxWidth: '500px' }}>{title?.split(' ').slice(0, 15).join(' ')}</h3>
            {user.user ? (
              <>
                <img
                  onClick={addFav}
                  src={JSON.parse(sessionStorage.getItem(slug)) ? activeHeartIcon : heartIcon}
                  alt="heart icon"
                />
                <span> {favoritesCount}</span>
              </>
            ) : null}
          </div>
          <div style={style.article__tags}>
            {tagList?.length
              ? tagList?.map((item, index) => (
                  <p key={index} className={style.article__tag}>
                    {item?.split(' ').slice(0, 5).join(' ')}
                  </p>
                ))
              : null}
          </div>
        </div>
        <div className={style.article__right}>
          <div className={style.article__profile}>
            <h3>{author.username}</h3>
            <p>{format(new Date(createdAt), 'MMMM M, yyyy')}</p>
          </div>
          <img src={author.image} alt="profile icon" />
        </div>
      </div>
      <p className={style.article__body}>
        <Link style={{ color: 'inherit' }} to={`/article/${slug}`}>
          {description?.split(' ').slice(0, 15).join(' ') + '...'}
        </Link>
      </p>
    </article>
  );
};

export default Articles;
