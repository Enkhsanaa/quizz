import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TeamOne from "./tabletView";
import Admin from "./admin";
import Board from "./scoreBoard";
import Login from "./login";
import Answer from "./answer";
import Check from "./checkScreen";

export default function QuizRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/one">
          <TeamOne />
        </Route>
        {/* <Route path="/two">
          <TeamTwo />
        </Route> */}
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/board">
          <Board />
        </Route>
        <Route path="/answer">
          <Answer />
        </Route>
        <Route path="/check">
          <Check />
        </Route>
      </Switch>
    </Router>
  );
}
