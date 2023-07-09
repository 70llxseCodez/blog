import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Spin } from 'antd';

import { getArticles } from '../../store/articles/articles-selector';
import { fetchArticles } from '../../store/articles/articles-async';
import Articles from '../../components/articles';
import MyError from '../../components/error';

import style from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = JSON.parse(localStorage.getItem('state'));
  const data = user ? user?.user?.token : false;
  useEffect(() => {
    dispatch(fetchArticles(data));
  }, []);
  const { articles, error } = useSelector(getArticles);
  if (error) {
    return <MyError />;
  }
  return (
    <main className="container" style={style.home}>
      {articles ? (
        articles?.articles.map((item, index) => <Articles key={index} {...item} />)
      ) : (
        <div className={style.home__loader}>
          <Spin size="large" />
        </div>
      )}

      {articles ? (
        <Pagination
          onChange={(number) => {
            window.scrollTo({ top: 0 });

            dispatch(fetchArticles(user.user ? user.user.token : false, number));
          }}
          className={style.home__pagination}
          defaultCurrent={1}
          total={articles.articlesCount * 2}
        />
      ) : null}
    </main>
  );
};

export default Home;
