import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import "./../css/question.css";
import bg1 from "./../images/bg1.png";
import bg2 from "./../images/bg2.png";
import blue from "./../images/blue.png";
import green from "./../images/green.png";
import orange from "./../images/orange.png";
import red from "./../images/red.png";
import unen from "./../images/unen.png";
import hudal from "./../images/hudal.png";
import url from "./module";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

function TeamOne() {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.state.detail); // result: 'some_value'
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${url.base}/api/get_quiz`, {
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
          //   setNumber(res.quiz.number);
          console.log(localStorage.getItem("checkQuiz"));
          console.log(res);
          setQuizNumber(res.quiz.number);
          setCopy(res.quiz.is_copy);
          if (localStorage.getItem("checkQuiz") < res.quiz.number) {
            console.log(localStorage.getItem("checkQuiz"), res.quiz.number);
            setCounter(0);
            setAlertAnswer("Байхгүй");
            // setClass1("one");
            // setClass2("one");
            // setClass3("one");
            // setClass4("one");
            localStorage.setItem("checkQuiz", res.quiz.number);
          }
        });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // const [classChoose1, setClass1] = useState("one");
  // const [classChoose2, setClass2] = useState("one");
  // const [classChoose3, setClass3] = useState("one");
  // const [classChoose4, setClass4] = useState("one");
  const [counter, setCounter] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [quiz, setQuiz] = useState("");
  const [round, setRound] = useState("");
  const [number, setNumber] = useState(1);
  const [quizNumber, setQuizNumber] = useState(1);
  const [copy, setCopy] = useState("");
  const [alertAnswer, setAlertAnswer] = useState("");

  const chooseAnswer = (e) => {
    console.log(number);
    console.log(counter);
    if (e === 1) {
      // setClass1("chosen");
      // alert("A");
      setAlertAnswer("A");
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
    } else if (e === 2) {
      // setClass2("chosen");
      // alert("B");
      setAlertAnswer("B");
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
    } else if (e === 3) {
      // setClass3("chosen");
      // alert("C");
      setAlertAnswer("C");
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
    } else if (e === 4) {
      // setClass4("chosen");
      // alert("D");
      setAlertAnswer("D");
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
    } else if (e === 9) {
      // setClass4("chosen");
      setCounter(1);
      alert("Хуулах");
      fetch(`${url.base}/api/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${location.state.detail}`,
        },
        body: JSON.stringify({
          quiz_number: quizNumber,
          letter: "Z",
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
      <div style={{ position: "absolute", left: 0, fontSize: "20px" }}>
        <Alert transition="fade" show={true} variant="info">
          <p>Сонгосон хариулт: {alertAnswer}</p>
        </Alert>
      </div>
      {round === "who" ? (
        answer.length !== 0 ? (
          <>
            {/* {copy === 1 ? (
              <div className="copy" onClick={() => chooseAnswer(9)}>
                Хуулах
              </div>
            ) : null} */}

            <div className="bg">
              <img alt="none" src={bg1}></img>
            </div>
            <div className="question-text">{quiz}</div>

            <div className="question-main">
              {answer.map((a, i) => {
                return (
                  <>
                    <div className="sub">
                      {i === 0 ? (
                        <div
                          className="classChooseContainer"
                          onClick={() => chooseAnswer(i + 1)}
                        >
                          <img alt="none" src={blue}></img>
                          <div className={`classChoose`}>{a.text}</div>
                        </div>
                      ) : null}
                      {i === 1 ? (
                        <div
                          className="classChooseContainer"
                          onClick={() => chooseAnswer(i + 1)}
                        >
                          <img alt="none" src={green}></img>
                          <div className={`classChoose`}>{a.text}</div>
                        </div>
                      ) : null}
                      {i === 2 ? (
                        <div
                          className="classChooseContainer"
                          onClick={() => chooseAnswer(i + 1)}
                        >
                          <img alt="none" src={orange}></img>
                          <div className={`classChoose`}>{a.text}</div>
                        </div>
                      ) : null}
                      {i === 3 ? (
                        <div
                          className="classChooseContainer"
                          onClick={() => chooseAnswer(i + 1)}
                        >
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
          {/* {copy === 1 ? (
            <div className="copy" onClick={() => chooseAnswer(9)}>
              Хуулах
            </div>
          ) : null} */}
          <div className="bg1">
            <img alt="none" src={bg2}></img>
          </div>
          <div className="question-text1">{quiz}</div>
          <div className="question-main">
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
          {/* {copy === 1 ? (
            <div className="copy" onClick={() => chooseAnswer(9)}>
              Хуулах
            </div>
          ) : null} */}
          <div className="bg">
            <img alt="none" src={bg1}></img>
          </div>
          <div className="question-text">{quiz}</div>
          <div className="question-main">
            {answer.map((a, i) => {
              return (
                <>
                  <div className="sub">
                    {i === 0 ? (
                      <div
                        className="classChooseContainer"
                        onClick={() => chooseAnswer(i + 1)}
                      >
                        <img alt="none" src={blue}></img>
                        <div className={`classChoose`}>{a.text}</div>
                      </div>
                    ) : null}
                    {i === 1 ? (
                      <div
                        className="classChooseContainer"
                        onClick={() => chooseAnswer(i + 1)}
                      >
                        <img alt="none" src={green}></img>
                        <div className={`classChoose`}>{a.text}</div>
                      </div>
                    ) : null}
                    {i === 2 ? (
                      <div
                        className="classChooseContainer"
                        onClick={() => chooseAnswer(i + 1)}
                      >
                        <img alt="none" src={orange}></img>
                        <div className={`classChoose`}>{a.text}</div>
                      </div>
                    ) : null}
                    {i === 3 ? (
                      <div
                        className="classChooseContainer"
                        onClick={() => chooseAnswer(i + 1)}
                      >
                        <img alt="none" src={red}></img>
                        <div className={`classChoose`}>{a.text}</div>
                      </div>
                    ) : null}
                  </div>
                </>
              );
            })}
            {/* <div className="sub">
              <div onClick={() => chooseAnswer(1)} className={classChoosee1}>
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
          </div>
        </>
      ) : null}
    </div>
  );
}

export default withRouter(TeamOne);
