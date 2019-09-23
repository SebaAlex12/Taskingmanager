import React from "react";
import "./App.css";

import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import TasksList from "./store/Tasks/components/TasksList";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App container">
          <TasksList />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
