import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch } from 'react-redux';

import { fetchLoginUser } from '../../store/user/user-async';

import style from './../signup/SignUp.module.scss';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const submit = (data) => dispatch(fetchLoginUser(data));
  return (
    <section className={style.signup}>
      <div className={style.signup__form}>
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit(submit)} className={style.signup__form_inputs}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'email should"t be empty',
            })}
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
            placeholder="Password"
            {...register('password', {
              required: 'password should be empty',
            })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <span style={{ color: 'red' }}>{message}</span>}
          />
          <button className={style.signup__button}>Login</button>
        </form>
        <p>
          Don’t have an account? <Link to={'/signup'}>Sign Up.</Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
