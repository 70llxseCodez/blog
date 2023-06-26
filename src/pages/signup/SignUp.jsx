import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch } from 'react-redux';

import { fetchRegisterUser } from '../../store/user/user-async';

import style from './SignUp.module.scss';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const submit = (data) => {
    dispatch(fetchRegisterUser(data));
  };
  return (
    <section className={style.signup}>
      <div className={style.signup__form}>
        <h3>Create new account</h3>
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

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Your password needs to be least 6 character',
              validate: (value) => {
                if (value.length < 6 || value.length > 40) return 'Your password needs to be least 6 character';
              },
            })}
            placeholder="Password"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <span style={{ color: 'red' }}>{message}</span>}
          />
          <label htmlFor="repeatPassword">Reapeat Password</label>
          <input
            id="repeatPassword"
            type="password"
            name="reapeatPassowrd"
            placeholder="Password"
            {...register('reapeatPassowrd', {
              required: 'password must match',
              validate: (value) => {
                if (watch('password') !== value) return 'password must match';
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="reapeatPassowrd"
            render={({ message }) => <span style={{ color: 'red' }}>{message}</span>}
          />

          <label className={style.signup__agrees}>
            <input
              type="checkbox"
              className={style.signup__checkbox}
              {...register('agree', {
                required: true,
              })}
            />
            I agree to the processing of my personal information
          </label>
          <button className={style.signup__button}>Create</button>
        </form>
        <p>
          Already have an account? <Link to={'/signin'}>Sign In.</Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
