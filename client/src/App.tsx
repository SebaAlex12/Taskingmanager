import React from "react";
import "./App.css";
import moment from "moment";

import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import jwt_decode from "jwt-decode";

import { fetchLoggedUser, fetchUsers } from "./store/Users/actions";
import LoginForm from "./store/Users/components/LoginForm";

import Dashboard from "./themes/layout/Dashboard";
import MessagesList from "./store/Messages/components/MessagesList";

if (localStorage.jwtTokenAuthorization) {
  const {
    _id,
    name,
    email,
    status,
    projects,
    users,
    createdAt,
    tokenCreatedAt,
    logged
  } = jwt_decode(localStorage.jwtTokenAuthorization);

  const expiredMinutes = 560;

  const difference = moment(new Date()).diff(tokenCreatedAt, "minutes");
  // console.log("difference", difference);

  if (difference < expiredMinutes) {
    store.dispatch(
      fetchLoggedUser({
        _id,
        name,
        email,
        status,
        projects,
        users,
        createdAt,
        tokenCreatedAt,
        logged
      })
    );
    store.dispatch(fetchUsers());
  } else {
    localStorage.removeItem("jwtTokenAuthorization");
  }
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ mode: "light" }}>
        <Router>
          <div className="App">
            <MessagesList />
            {!localStorage.jwtTokenAuthorization ||
            localStorage.jwtTokenAuthorization === undefined ? (
              <div className="login-box">
                <LoginForm />
              </div>
            ) : (
              <Dashboard />
            )}
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
