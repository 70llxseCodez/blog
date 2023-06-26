import React from 'react';
import { useParams } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useSelector } from 'react-redux';

import { getUser } from '../../store/user/user-selector';
import { fetchEditSignArticle } from '../../store/single-article/single-async';

import style from './../create-article/CreateArticle.module.scss';

const EditArticle = () => {
  const { id } = useParams();

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
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });
  const { user: auth } = useSelector(getUser);

  const submit = (data) => {
    reset();
    const tags = data.tagList.map((item) => (item.value?.length > 0 ? item.value : null));
    const articleObj = { ...data, tagList: tags, createdAt: new Date() };
    fetchEditSignArticle(id, articleObj, auth.token);
  };
  return (
    <div className={style.article}>
      <h3>Edit article</h3>
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

export default EditArticle;
