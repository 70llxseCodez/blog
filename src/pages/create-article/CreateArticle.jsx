import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchAddArticle } from '../../store/articles/articles-async';
import { getUser } from '../../store/user/user-selector';

import style from './CreateArticle.module.scss';

const CreateArticle = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      tagList: [{ value: '' }],
    },
  });
  const dispatch = useDispatch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });
  const {
    user: { user },
  } = JSON.parse(localStorage.getItem('state'));
  const submit = (data) => {
    reset();
    const tags = data.tagList.map((item) => (item.value?.length > 0 ? item.value : 'none'));
    const articleObj = { ...data, tagList: tags, createdAt: new Date() };
    dispatch(fetchAddArticle(articleObj, user.token));
  };
  const { user: auth } = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [navigate, auth]);
  return (
    <div className={style.article}>
      <h3>Create new article</h3>
      <form onSubmit={handleSubmit(submit)} className={style.article__form}>
        <label htmlFor="title">Title</label>
        <input
          {...register('title', {
            required: 'title should"be empty',
          })}
          className={style.article__input}
          id="title"
          type="text"
          placeholder="Title"
        />
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ message }) => <span style={{ color: 'red', marginTop: '5px' }}>{message}</span>}
        />

        <label htmlFor="description">Short description</label>
        <input
          {...register('description', {
            required: 'description should"be empty',
          })}
          className={style.article__input}
          id="description"
          type="text"
          placeholder="Title"
        />

        <ErrorMessage
          errors={errors}
          name="description"
          render={({ message }) => <span style={{ color: 'red', marginTop: '5px' }}>{message}</span>}
        />
        <label>Text</label>
        <textarea
          {...register('body', {
            required: 'body shouldnt be empty',
          })}
          placeholder="Text"
          cols="30"
          rows="10"
        ></textarea>
        <ErrorMessage
          errors={errors}
          name="body"
          render={({ message }) => <span style={{ color: 'red', marginTop: '5px' }}>{message}</span>}
        />
        <label htmlFor="Tags"></label>
        <div className={style.article__tags}>
          <section>
            {fields.map((item, index) => {
              return (
                <div key={item.id} className={style.tags__input}>
                  <input type="text" placeholder="Tags" {...register(`tagList.${index}.value`)} />
                  <div className={style.tags__delete} onClick={() => remove(index)}>
                    delete
                  </div>
                </div>
              );
            })}
          </section>
          <div className={style.tags__add} onClick={() => append({ firstName: 'bill' })}>
            Add tag
          </div>
        </div>
        <div>
          <button type="submit" className={style.article__button}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;
