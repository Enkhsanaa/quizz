import React, { useEffect, useState } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import "./../css/board.css";
import url from "./module";

function Admin() {
  let history = useHistory();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [score1, setScore1] = useState([]);
  const [answer1, setAnswer1] = useState({});
  const [answer2, setAnswer2] = useState({});

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.state.detail); // result: 'some_value'
    localStorage.setItem("adminToken", location.state.detail);
  }, [location]);
  const getNext = () => {
    fetch(`${url.base}/api/next_quiz`, {
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

  const getCopy = () => {
    fetch(`${url.base}/api/copy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${location.state.detail}`,
      },
      body: JSON.stringify({
        username: localStorage.getItem("team1"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  const getCopy1 = () => {
    fetch(`${url.base}/api/copy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${location.state.detail}`,
      },
      body: JSON.stringify({
        username: localStorage.getItem("team2"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  const startTimer = () => {
    fetch(`${url.base}/api/start_time`, {
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
    fetch(`${url.base}/api/correct_answer`, {
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

  const apiRestart = () => {
    fetch(`${url.base}/api/restart`, {
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
    fetch(`${url.base}/api/user_answer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //   Authorization: `Bearer ${location.state.detail}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAnswer1(res[0]);
        setAnswer2(res[1]);
      });
  };

  const stopVideo = () => {
    localStorage.setItem("videoPlay", 0);
  };

  return (
    <div className="admin-panel">
      <button className="board-button5" onClick={apiRestart}>
        Restart
      </button>
      <button className="board-button5" onClick={getNext}>
        Дараагийн асуулт
      </button>

      <button className="board-button6" onClick={getCorrectAnswer}>
        Зөв хариулт
      </button>

      <button className="board-button2" onClick={startTimer}>
        Цаг эхлүүлэх
      </button>

      <button className="board-button2" onClick={startVideo}>
        Хариулт харуулах
      </button>
      <button className="board-button2" onClick={stopVideo}>
        Хариулт нуух
      </button>

      <button className="board-button2" onClick={getCopy}>
        Team 1 copy
      </button>

      <button className="board-button2" onClick={getCopy1}>
        Team 2 copy
      </button>

      <div>{name}</div>
      <div>
        {correctAnswer.map((a) => {
          return <>{a.is_correct ? <p>{a.letter}</p> : null}</>;
        })}
      </div>

      <div className="">
        <div>Багийн нэр:</div>
        <div style={{ marginBottom: "20px" }}>{answer1.username}</div>
        <div>Хариулт:</div>
        <div>{answer1.answer_letter}</div>
      </div>
      <div className="">
        <div>Багийн нэр:</div>
        <div style={{ marginBottom: "20px" }}>{answer2.username}</div>
        <div>Хариулт:</div>
        <div>{answer2.answer_letter}</div>
      </div>
    </div>
  );
}

export default withRouter(Admin);
