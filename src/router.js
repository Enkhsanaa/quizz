import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TeamOne from "./teamOne";
import TeamTwo from "./teamTwo";
import Admin from "./admin";
import Board from "./board";
import App from "./App";

export default function QuizRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/one">
          <TeamOne />
        </Route>
        <Route path="/two">
          <TeamTwo />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/board">
          <Board />
        </Route>
      </Switch>
    </Router>
  );
}
