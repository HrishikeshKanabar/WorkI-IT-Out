import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
const handleFormSubmit = async event => {
  event.preventDefault();

  try {
    const { data } = await login({
      variables: { ...formState }
    });
  
    Auth.login(data.login.token);
  } catch (e) {
    console.error(e);
  }
};

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">

      <h2 className="text-center font-poppins text-super-dark">CONNECT WITH YOUR WORKOUT BUDDIES</h2>
      <h4 className="text-center font-poppins text-super-dark">Share your workout routines</h4>
      <br/>
        <div className="card">
          <h4 className="card-header">Login</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                LOGIN
              </button>
              <p className="text-center">Don't Have a account yet, you can <button className="btn ">
              <a href={`/signup`}>Sign Up Here</a>
              </button>  </p>
              
            </form>
            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
