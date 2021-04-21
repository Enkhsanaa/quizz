import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import "./board.css";
import vid from "./video.mp4";

function Answer() {
  const location = useLocation();
  const [answer, setAnswer] = useState("normal");
  const [answer1, setAnswer1] = useState({});
  const [answer2, setAnswer2] = useState({});
  const [show, setShow] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://sta.api.cashone.mn/api/user_answer", {
        //   fetch("http://202.21.123.43:8082/api/user_answer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${location.state.detail}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          //   setNumber(res.quiz.number);
          setAnswer1(res[0]);
          setAnswer2(res[1]);
          console.log(res);
          if (localStorage.getItem("videoPlay") == 1) {
            setShow(true);
          } else {
            setShow(false);
          }
        });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {show === true ? (
        <div className="team-answer">
          <div
            className={
              answer1.status === 1
                ? "green"
                : answer1.status === 2
                ? "red"
                : "normal"
            }
          >
            <div className="answer-board-team">
              <div>{answer1.username}</div>
              <div>{answer1.answer_letter}</div>
            </div>
          </div>
          <div
            className={
              answer1.status === 1
                ? "green"
                : answer1.status === 2
                ? "red"
                : "normal"
            }
          >
            <div className="answer-board-team">
              <div>{answer2.username}</div>
              <div>{answer2.answer_letter}</div>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        <video
          style={{
            height: "100%",
            overflow: "hidden",
            position: "fixed",
            zIndex: "-1",
          }}
          autoPlay
          loop
          muted
          src={vid}
        ></video>
      </div>
    </>
  );
}

export default withRouter(Answer);
