import React, { useEffect, useState } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import "./board";

function Admin() {
  let history = useHistory();
  const [id, setId] = useState("");
  const [name2, setName2] = useState("");
  const [score, setScore] = useState([]);
  const [score1, setScore1] = useState([]);

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.state.detail); // result: 'some_value'
    localStorage.setItem("adminToken", location.state.detail);
  }, [location]);
  const getNext = () => {
    fetch("http://sta.api.cashone.mn/api/next_quiz", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${location.state.detail}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setId(res.quiz.number);
      });
  };

  const getCorrect = () => {
    // fetch(`http://sta.api.cashone.mn/api/get_correct/${id}`, {
    fetch(`http://sta.api.cashone.mn/api/get_correct/1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${location.state.detail}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <button className="board-button" onClick={getNext}>
        Дараагийн асуулт
      </button>

      <button className="board-button1" onClick={getCorrect}>
        Зөв хариулт харуулах
      </button>
    </div>
  );
}

export default withRouter(Admin);
