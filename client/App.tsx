import React, { FC } from 'react';
import { render } from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import SearchPage from './Routes/SearchPage';
import FavoritesPage from './Routes/FavoritesPage';

const App: FC<any> = (props: any) => {
  const [verified, setVerified] = React.useState<boolean>(false);
  const verifiedHandler = () => {
    setVerified(true);
  };

  const checkLoggedin = () => {
    fetch('login/verifyToken', {
      method: 'POST',
    })
      .then((response: any) => response.json())
      .then((data: any) => {
        if (data.verified) verifiedHandler();
        <Redirect to="/SearchPage" />;
      });
  };
  //place this inside use effect, because everytime component re-renders this will need to be updated, otherwise this will cause infinite looping
  checkLoggedin();

  return (
    <Router>
      {verified ? <Redirect to="/SearchPage" /> : <Redirect to="/login" />}
      {/* <p className="Header">JobQuiver</p> */}
      {/* <Redirect to="/SearchPage" /> */}
      <Switch>
        <Route
          exact
          path="/login"
          component={() => (
            <Login
              verifiedHandler={verifiedHandler}
              checkLoggedin={checkLoggedin}
            />
          )}
        />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/SearchPage" component={SearchPage} />
        <Route exact path="/FavoritePage" component={FavoritesPage} />
      </Switch>
    </Router>
  );
};

export default App;
