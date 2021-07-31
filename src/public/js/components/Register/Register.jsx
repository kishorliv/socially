import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../config/routes';
import validate from './validate';
import { register } from '../../redux/AuthSlice';

function renderField({ input, label, type, meta: { touched, error } }) {
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>{label}</label>
      <div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
}

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loading, error, errorMessage, user } = useSelector(
    (state) => state.auth,
  );
  const isAuthenticated = !!user;
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();

    const newUser = { firstName, lastName, email, password, confirmPassword };
    dispatch(register(newUser));

    console.log('register form submitted.');
  }

  return (
    <>
      {isAuthenticated && <Redirect to={`${routes.root}`} />}

      <div>
        <form onSubmit={onSubmit}>
          <Field
            name="firstName"
            type="text"
            component={renderField}
            label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Field
            name="lastName"
            type="text"
            component={renderField}
            label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Field
            name="email"
            type="email"
            component={renderField}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Field
            name="confirmPassword"
            type="password"
            component={renderField}
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div>
            <button type="submit" disabled={loading}>
              Register
            </button>
            <Link to={`${routes.login}`}>Login</Link>
          </div>
        </form>

        {error && <p>{`Error: ${errorMessage}`}</p>}
        {loading && <p>Registering...</p>}
      </div>
    </>
  );
}

export default reduxForm({
  form: 'registerForm',
  validate,
})(Register);
