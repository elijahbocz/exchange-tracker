import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import SuccessfulRegistration from "./components/user/SuccessfulRegistration";
import Dashboard from "./components/dashboard/Dashboard";
import Entry from "./components/dashboard/Entry";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/successful-registration">
              <SuccessfulRegistration />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/dashboard-entry">
              <Entry />
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
