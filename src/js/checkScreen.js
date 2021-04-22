import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import "./../css/check.css";
import bg1 from "./../images/bg1.png";
import bg2 from "./../images/bg2.png";
import blue from "./../images/blue.png";
import green from "./../images/green.png";
import orange from "./../images/orange.png";
import red from "./../images/red.png";
import unen from "./../images/unen.png";
import hudal from "./../images/hudal.png";
import url from "./module";

function Check() {
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
          setAnswer(res.answer);
          setQuiz(res.quiz.text);
          setRound(res.quiz.category);
          setNumber(1);
          console.log(localStorage.getItem("checkQuiz"));
          console.log(res);
          setQuizNumber(res.quiz.number);
          setCopy(res.quiz.is_copy);
          if (localStorage.getItem("checkQuiz") < res.quiz.number) {
            console.log(localStorage.getItem("checkQuiz"), res.quiz.number);
            setCounter(0);
            setClass1("one");
            setClass2("one");
            setClass3("one");
            setClass4("one");
            localStorage.setItem("checkQuiz", res.quiz.number);
          }
        });
    }, 3000);
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
  const [number, setNumber] = useState(1);
  const [quizNumber, setQuizNumber] = useState(1);
  const [copy, setCopy] = useState("");

  const chooseAnswer = (e) => {
    console.log(number);
    console.log(counter);
    console.log(classChoose1);
    console.log(classChoose2);
    console.log(classChoose3);
    console.log(classChoose4);
    console.log(copy);
    if (e === 1 && counter === 0) {
      setClass1("chosen");
      setCounter(1);
      fetch(`${url.base}/api/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.detail}`,
        },
        body: JSON.stringify({
          quiz_number: quizNumber,
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
      fetch(`${url.base}/api/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.detail}`,
        },
        body: JSON.stringify({
          quiz_number: quizNumber,
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
      fetch(`${url.base}/api/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.detail}`,
        },
        body: JSON.stringify({
          quiz_number: quizNumber,
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
      fetch(`${url.base}/api/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.detail}`,
        },
        body: JSON.stringify({
          quiz_number: quizNumber,
          letter: "D",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    } else if (e === 9 && counter === 0) {
      // setClass4("chosen");
      setCounter(1);
      fetch(`${url.base}/api/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.detail}`,
        },
        body: JSON.stringify({
          quiz_number: quizNumber,
          letter: "W",
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
            <div className="check-bg">
              <img alt="none" src={bg1}></img>
            </div>
            <div className="check-text">{quiz}</div>
            {/* <div className="sub">
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
              </div> */}
            <div className="check-main">
              {answer.map((a, i) => {
                return (
                  <>
                    <div className="sub">
                      {i === 0 ? (
                        <div className="classChooseContainer">
                          <img alt="none" src={blue}></img>
                          <div className={`classChoose`}>{a.text}</div>
                        </div>
                      ) : null}
                      {i === 1 ? (
                        <div className="classChooseContainer">
                          <img alt="none" src={green}></img>
                          <div className={`classChoose`}>{a.text}</div>
                        </div>
                      ) : null}
                      {i === 2 ? (
                        <div className="classChooseContainer">
                          <img alt="none" src={orange}></img>
                          <div className={`classChoose`}>{a.text}</div>
                        </div>
                      ) : null}
                      {i === 3 ? (
                        <div className="classChooseContainer">
                          <img alt="none" src={red}></img>
                          <div className={`classChoose`}>{a.text}</div>
                        </div>
                      ) : null}
                    </div>
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <div></div>
        )
      ) : round === "truefalse" ? (
        <>
          <div className="check-bg1">
            <img alt="none" src={bg2}></img>
          </div>
          <div className="check-text1">{quiz}</div>
          <div className="check-main">
            <div className="sub">
              <div onClick={() => chooseAnswer(1)}>
                <img alt="none" src={unen}></img>
                {/* <div className={classChoose2}>{answer[0].text}</div> */}
              </div>
            </div>
            <div className="sub">
              <div onClick={() => chooseAnswer(2)}>
                <img alt="none" src={hudal}></img>
                {/* <div className={classChoose1}>{answer[1].text}</div> */}
              </div>
            </div>
          </div>
        </>
      ) : round === "choose" ? (
        <>
          <div className="check-bg">
            <img alt="none" src={bg1}></img>
          </div>
          <div className="check-text">{quiz}</div>
          <div className="check-main">
            {answer.map((a, i) => {
              return (
                <>
                  <div className="sub">
                    {i === 0 ? (
                      <div className="classChooseContainer">
                        <img alt="none" src={blue}></img>
                        <div className={`classChoose`}>{a.text}</div>
                      </div>
                    ) : null}
                    {i === 1 ? (
                      <div className="classChooseContainer">
                        <img alt="none" src={green}></img>
                        <div className={`classChoose`}>{a.text}</div>
                      </div>
                    ) : null}
                    {i === 2 ? (
                      <div className="classChooseContainer">
                        <img alt="none" src={orange}></img>
                        <div className={`classChoose`}>{a.text}</div>
                      </div>
                    ) : null}
                    {i === 3 ? (
                      <div className="classChooseContainer">
                        <img alt="none" src={red}></img>
                        <div className={`classChoose`}>{a.text}</div>
                      </div>
                    ) : null}
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default withRouter(Check);
