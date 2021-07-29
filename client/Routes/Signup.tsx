import React, { FC, useState } from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory,
} from 'react-router-dom';

const Signup: FC<any> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const history = useHistory();
  //saves user's input for username and password
  const setUsernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const setPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  //signs up the user
  const signupHandler = async () => {
    await fetch('/login/authsignup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response: any) => response.json())
      .then((data: any) => {
        if (data.verified) {
          // <Redirect to="/SearchPage" />;
          history.push('/SearchPage')
        } else {
          setErrorMessage('Invalid username/password');
        }
      });
  };

  return (
    <div className="LoginContainer">
      <p className="Header">+ JobQuiver</p>
      <input
        className="usernameInput"
        type="text"
        value={username}
        onChange={setUsernameHandler}
      />
      <input
        className="passwordInput"
        type="text"
        value={password}
        onChange={setPasswordHandler}
      />
      <button className="LoginSignupButton" onClick={signupHandler}>
        Sign Up
      </button>
      <div className="errorMessage">{errorMessage}</div>
    </div>
  );
};

export default Signup;
