import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Button, Popconfirm, Spin, message } from 'antd';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { fetchDeleteSingleArticle, fetchSingleArticle } from '../../store/single-article/single-async';
import { getSignleArticle } from '../../store/single-article/single-selector';

import heartIcon from './../../icons/heart.svg';
import activeHeartIcon from './../../icons/activeHeart.svg';
import style from './../../components/articles/Articles.module.scss';
import './SingleArticle.module.scss';

const SingleArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleArticle } = useSelector(getSignleArticle);
  console.log(singleArticle);
  const {
    user: { user },
  } = JSON.parse(localStorage.getItem('state'));

  useEffect(() => {
    dispatch(fetchSingleArticle(id));
  }, [id]);
  const confirm = () => {
    message.success('Click on Yes');
    fetchDeleteSingleArticle(id, user.token);
  };
  const cancel = () => {
    message.error('Click on No');
  };
  return (
    <div className={style.single}>
      {singleArticle ? (
        <article className={style.article}>
          <div className={style.article__title}>
            <div className={style.article__left}>
              <div className={style.article__text}>
                <h3 style={{ maxWidth: '500px' }}>{singleArticle.article.title.split(' ').slice(0, 15).join(' ')}</h3>
                <img src={singleArticle.article.favorited ? activeHeartIcon : heartIcon} alt="heart icon" />{' '}
                <span> {singleArticle.article.favoritesCount}</span>
              </div>
              <div style={style.article__tags}>
                {singleArticle.article.tagList?.length
                  ? singleArticle.article.tagList?.map((item, index) => (
                      <p key={index} className={style.article__tag}>
                        {item.split(' ').slice(0, 5).join(' ')}
                      </p>
                    ))
                  : null}
              </div>
            </div>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <div>
                  <h3>{singleArticle.article.author.username}</h3>
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: '12px',
                      color: 'rgba(0, 0, 0, 0.4666666667)',
                    }}
                  >
                    {format(new Date(singleArticle.article.createdAt), 'MMMM M, yyyy')}
                  </p>
                </div>
                <div>
                  <img
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      marginLeft: '10px',
                    }}
                    src={singleArticle.article.author.image}
                    alt="profile icon"
                  />
                </div>
              </div>
              {singleArticle.article.author.username === user.username ? (
                <>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>
                  <Link to={`/edit-articles/${singleArticle.article.slug}`} className={style.article__edit}>
                    edit
                  </Link>
                </>
              ) : null}
            </div>
          </div>
          <div className={style.article__slug}>
            <h3>{singleArticle.article.description}</h3>
            <ReactMarkdown>{singleArticle.article.body}</ReactMarkdown>
          </div>
        </article>
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
};

export default SingleArticle;
