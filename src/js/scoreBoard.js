import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import "./../css/board.css";
import url from "./module";

function Board() {
  const location = useLocation();
  const [score, setScore] = useState([]);
  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(localStorage.getItem("adminToken"));
  }, [location]);
  const seeScore = () => {
    fetch(`${url.base}/api/get_score`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setScore(res);
        console.log(res);
      });
  };
  return (
    <div className="board">
      <button onClick={seeScore}>Оноо харах</button>

      {score.map((a) => {
        return (
          <div className="board-one">
            <p>{a.username}</p>
            <p>{a.score}</p>
          </div>
        );
      })}
    </div>
  );
}

export default withRouter(Board);
