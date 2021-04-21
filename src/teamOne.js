import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import "./question.css";
import bg1 from "./bg1.png";
import bg2 from "./bg2.png";

function TeamOne() {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.state.detail); // result: 'some_value'
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://sta.api.cashone.mn/api/get_quiz", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.detail}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setAnswer(res.answer);
          setQuiz(res.quiz.text);
          setRound(res.quiz.category);
          console.log(res);
        });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [classChoose1, setClass1] = useState("one");
  const [classChoose2, setClass2] = useState("one");
  const [classChoose3, setClass3] = useState("one");
  const [classChoose4, setClass4] = useState("one");
  const [counter, setCounter] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [quiz, setQuiz] = useState("");
  const [round, setRound] = useState("");

  //   setInterval(() => {
  //     fetch("http://sta.api.cashone.mn/api/get_quiz", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${location.state.detail}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         setAnswer(res.answer);
  //         console.log(res);
  //       });
  //   }, 5000);

  const chooseAnswer = (e) => {
    console.log(counter);
    if (e === 1 && counter === 0) {
      setClass1("chosen");
      setCounter(1);
      fetch("http://sta.api.cashone.mn/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.detail}`,
        },
        body: JSON.stringify({
          quiz_number: 1,
          letter: "A",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    } else if (e === 2 && counter === 0) {
      setClass2("chosen");
      setCounter(1);
      fetch("http://sta.api.cashone.mn/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.detail}`,
        },
        body: JSON.stringify({
          quiz_number: 1,
          letter: "B",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    } else if (e === 3 && counter === 0) {
      setClass3("chosen");
      setCounter(1);
      fetch("http://sta.api.cashone.mn/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.detail}`,
        },
        body: JSON.stringify({
          quiz_number: 1,
          letter: "C",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    } else if (e === 4 && counter === 0) {
      setClass4("chosen");
      setCounter(1);
      fetch("http://sta.api.cashone.mn/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.detail}`,
        },
        body: JSON.stringify({
          quiz_number: 1,
          letter: "D",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    }
  };

  return (
    <div className="main">
      {round === "who" ? (
        answer.length !== 0 ? (
          <>
            <div className="bg">
              <img src={bg1}></img>
            </div>
            <div className="question-text">{quiz}</div>
            <div className="question-main">
              <div className="sub">
                <div onClick={() => chooseAnswer(1)} className={classChoose1}>
                  {answer[0].text}
                </div>
                <div onClick={() => chooseAnswer(2)} className={classChoose2}>
                  {answer[1].text}
                </div>
              </div>
              <div className="sub">
                <div onClick={() => chooseAnswer(3)} className={classChoose3}>
                  {answer[2].text}
                </div>
                <div onClick={() => chooseAnswer(4)} className={classChoose4}>
                  {answer[3].text}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div></div>
        )
      ) : round === "truefalse" ? (
        <>
          <div className="bg">
            <img src={bg2}></img>
          </div>
          <div className="question-text">{quiz}</div>
          <div className="question-main">
            <div className="sub">
              <div onClick={() => chooseAnswer(1)} className={classChoose1}>
                {answer[0].text}
              </div>
              <div onClick={() => chooseAnswer(2)} className={classChoose2}>
                {answer[1].text}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default withRouter(TeamOne);
