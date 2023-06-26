import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { fetchUpdateProfile } from '../../store/user/user-async';

import style from './../signup/SignUp.module.scss';

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const {
    user: { user },
  } = JSON.parse(localStorage.getItem('state'));
  const submit = (data) => {
    dispatch(fetchUpdateProfile({ ...data, token: user.token }));
  };

  return (
    <section className={style.signup}>
      <div className={style.signup__form}>
        <h3>Edit Profile</h3>
        <form onSubmit={handleSubmit(submit)} className={style.signup__form_inputs}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            {...register('username', {
              required: 'Username should"t be empty',
            })}
            placeholder="Username"
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => <span style={{ color: 'red' }}>{message}</span>}
          />
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email shouldn"t be empty' })}
            placeholder="Email Address"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <span style={{ color: 'red' }}>{message}</span>}
          />

          <label htmlFor="password">New password</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Your password needs to be least 6 character',
              validate: (value) => {
                if (value.length < 6 || value.length > 40) return 'Your password needs to be least 6 character';
              },
            })}
            placeholder="New password"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <span style={{ color: 'red' }}>{message}</span>}
          />
          <label htmlFor="password">Avatar image (url)</label>

          <input type="text" name="image" placeholder="Avatar image" {...register('image')} />
          <button className={style.signup__button}>Save</button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
