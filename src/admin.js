import React, { useEffect, useState } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import "./board";

function Admin() {
  let history = useHistory();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
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
        setName(res.quiz.text);
        setCorrectAnswer(res.answer);
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

  const startTimer = () => {
    // fetch(`http://sta.api.cashone.mn/api/get_correct/${id}`, {
    fetch(`http://sta.api.cashone.mn/api/start_time`, {
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

  const getCorrectAnswer = () => {
    // fetch(`http://sta.api.cashone.mn/api/get_correct/${id}`, {
    fetch(`http://sta.api.cashone.mn/api/correct_answer`, {
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

  const startVideo = () => {
    localStorage.setItem("videoPlay", 1);
  };

  const stopVideo = () => {
    localStorage.setItem("videoPlay", 0);
  };

  return (
    <div className="admin-panel">
      <button className="board-button5" onClick={getNext}>
        Дараагийн асуулт
      </button>

      {/* <button className="board-button6" onClick={getCorrect}>
        Зөв хариулт харуулах
      </button> */}

      <button className="board-button6" onClick={getCorrectAnswer}>
        Зөв хариулт
      </button>

      <button className="board-button2" onClick={startTimer}>
        Цаг эхлүүлэх
      </button>

      <button className="board-button2" onClick={startVideo}>
        Video эхлүүлэх
      </button>
      <button className="board-button2" onClick={stopVideo}>
        Video зогсоох
      </button>

      <div>{name}</div>
      <div>
        {correctAnswer.map((a) => {
          return <>{a.is_correct ? <p>{a.letter}</p> : null}</>;
        })}
      </div>
    </div>
  );
}

export default withRouter(Admin);
