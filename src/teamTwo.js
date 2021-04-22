import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import "./question.css";
import bg1 from "./bg1.png";
import bg2 from "./bg2.png";

function TeamTwo() {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://192.168.10.100:8000/api/get_quiz", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setQuiz(res.quiz.text);
          setAnswer(res.correct.letter);
          console.log(res);
        });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [quiz, setQuiz] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <div className="main">
      <>
        <div className="bg">
          <img src={bg1}></img>
        </div>
        <div className="question-text">{quiz}</div>
        <div className="answer">{answer}</div>
      </>
    </div>
  );
}

export default withRouter(TeamTwo);
