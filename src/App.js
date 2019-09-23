import React from "react";
import "./App.css";

import store from "./store/store";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>Tasks</h1>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
