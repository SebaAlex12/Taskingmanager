import React from "react";
import "./App.css";
import moment from "moment";

import store from "./store/store";
import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import jwt_decode from "jwt-decode";

import { baseUrl } from './store/ini';

import {
  fetchLoggedUser,
  fetchUsers,
} from "./store/Users/actions";
import LoginForm from "./store/Users/components/LoginForm";

import Dashboard from "./themes/layout/Dashboard";

import { StyledResponsive } from "./StyledResponsive";

function App() {

  if (localStorage.jwtTokenAuthorization) {
    const {
      _id,
      name,
      email,
      status,
      company,
      projects,
      users,
      lastActive,
      createdAt,
      employer,
      tokenCreatedAt,
      logged,
    } = jwt_decode(localStorage.jwtTokenAuthorization);
  
    const expiredMinutes = 560;
  
    const difference = moment(new Date()).diff(tokenCreatedAt, "minutes");
  
    if (difference < expiredMinutes) {
      store.dispatch(
        fetchLoggedUser({
          _id,
          name,
          email,
          status,
          company,
          projects,
          users,
          createdAt,
          employer,
          lastActive,
          tokenCreatedAt,
          logged,
        })
      );
      if (status === "SuperAdministrator") {
        store.dispatch(fetchUsers());
      } else {
        store.dispatch(fetchUsers({ company: company }));
      }
    } else {
      localStorage.removeItem("jwtTokenAuthorization");
      window.location.href = '/';
    }
  }
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ mode: "light" }}>
            <StyledResponsive>
                  <BrowserRouter basename={ baseUrl }>
                        <Routes className="App" >
                            <Route path="/dashboard/*" element={<Dashboard />} />
                            <Route path="/" element={<LoginForm />} />
                        </Routes>
                    </BrowserRouter>
            </StyledResponsive>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
