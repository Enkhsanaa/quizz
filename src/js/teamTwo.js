import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import "./../css/question.css";
import bg1 from "./../images/bg1.png";
import url from "./module";

function TeamTwo() {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${url.base}/api/get_quiz`, {
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
          <img alt="none" src={bg1}></img>
        </div>
        <div className="question-text">{quiz}</div>
        <div className="answer">{answer}</div>
      </>
    </div>
  );
}

export default withRouter(TeamTwo);
