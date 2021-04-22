import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import "./question.css";
import bg1 from "./bg1.png";
import bg2 from "./bg2.png";
import blue from "./blue.png";
import green from "./green.png";
import orange from "./orange.png";
import red from "./red.png";
import unen from "./unen.png";
import hudal from "./hudal.png";

function TeamOne() {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.state.detail); // result: 'some_value'
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://192.168.10.100:8000/api/get_quiz", {
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
            setClass1("one");
            setClass2("one");
            setClass3("one");
            setClass4("one");
            localStorage.setItem("checkQuiz", res.quiz.number);
          }
        });
    }, 8000);
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

  //   setInterval(() => {
  //     fetch("http://192.168.10.100:8000/api/get_quiz", {
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
    console.log(number);
    console.log(counter);
    if (e === 1) {
      setClass1("chosen");
      alert("A");
      setCounter(1);
      fetch("http://192.168.10.100:8000/api/answer", {
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
      setClass2("chosen");
      alert("B");
      setCounter(1);
      fetch("http://192.168.10.100:8000/api/answer", {
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
      setClass3("chosen");
      alert("C");
      setCounter(1);
      fetch("http://192.168.10.100:8000/api/answer", {
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
      setClass4("chosen");
      alert("D");
      setCounter(1);
      fetch("http://192.168.10.100:8000/api/answer", {
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
      fetch("http://192.168.10.100:8000/api/answer", {
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
      {round === "who" ? (
        answer.length !== 0 ? (
          <>
            {copy === 1 ? (
              <div className="copy" onClick={() => chooseAnswer(9)}>
                Хуулах
              </div>
            ) : null}

            <div className="bg">
              <img src={bg1}></img>
            </div>
            <div className="question-text">{quiz}</div>
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
                          <img src={blue}></img>
                          <div className={`classChoose`}>{a.text}</div>
                        </div>
                      ) : null}
                      {i === 1 ? (
                        <div
                          className="classChooseContainer"
                          onClick={() => chooseAnswer(i + 1)}
                        >
                          <img src={green}></img>
                          <div className={`classChoose`}>{a.text}</div>
                        </div>
                      ) : null}
                      {i === 2 ? (
                        <div
                          className="classChooseContainer"
                          onClick={() => chooseAnswer(i + 1)}
                        >
                          <img src={orange}></img>
                          <div className={`classChoose`}>{a.text}</div>
                        </div>
                      ) : null}
                      {i === 3 ? (
                        <div
                          className="classChooseContainer"
                          onClick={() => chooseAnswer(i + 1)}
                        >
                          <img src={red}></img>
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
          {copy === 1 ? (
            <div className="copy" onClick={() => chooseAnswer(9)}>
              Хуулах
            </div>
          ) : null}
          <div className="bg1">
            <img src={bg2}></img>
          </div>
          <div className="question-text1">{quiz}</div>
          <div className="question-main">
            <div className="sub">
              <div onClick={() => chooseAnswer(1)}>
                <img src={unen}></img>
                {/* <div className={classChoose2}>{answer[0].text}</div> */}
              </div>
            </div>
            <div className="sub">
              <div onClick={() => chooseAnswer(2)}>
                <img src={hudal}></img>
                {/* <div className={classChoose1}>{answer[1].text}</div> */}
              </div>
            </div>
          </div>
        </>
      ) : round === "choose" ? (
        <>
          {copy === 1 ? (
            <div className="copy" onClick={() => chooseAnswer(9)}>
              Хуулах
            </div>
          ) : null}
          <div className="bg">
            <img src={bg1}></img>
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
                        <img src={blue}></img>
                        <div className={`classChoose`}>{a.text}</div>
                      </div>
                    ) : null}
                    {i === 1 ? (
                      <div
                        className="classChooseContainer"
                        onClick={() => chooseAnswer(i + 1)}
                      >
                        <img src={green}></img>
                        <div className={`classChoose`}>{a.text}</div>
                      </div>
                    ) : null}
                    {i === 2 ? (
                      <div
                        className="classChooseContainer"
                        onClick={() => chooseAnswer(i + 1)}
                      >
                        <img src={orange}></img>
                        <div className={`classChoose`}>{a.text}</div>
                      </div>
                    ) : null}
                    {i === 3 ? (
                      <div
                        className="classChooseContainer"
                        onClick={() => chooseAnswer(i + 1)}
                      >
                        <img src={red}></img>
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
