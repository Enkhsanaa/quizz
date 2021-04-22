import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import "./../css/board.css";
import vid from "./../images/video.mp4";
import url from "./module";

function Answer() {
  const location = useLocation();
  const [answer1, setAnswer1] = useState({});
  const [answer2, setAnswer2] = useState({});
  const [show, setShow] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${url.base}/api/user_answer`, {
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
          localStorage.setItem("team1", res[0].username);
          localStorage.setItem("team2", res[1].username);
          if (localStorage.getItem("videoPlay") == 1) {
            setShow(true);
          } else {
            setShow(false);
          }
        });
    }, 2000);
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
              <div>Багийн нэр:</div>
              <div style={{ marginBottom: "20px" }}>{answer1.username}</div>
              <div>Хариулт:</div>
              <div>{answer1.answer_letter}</div>
            </div>
          </div>
          <div
            className={
              answer2.status === 1
                ? "green"
                : answer2.status === 2
                ? "red"
                : "normal"
            }
          >
            <div className="answer-board-team">
              <div>Багийн нэр:</div>
              <div style={{ marginBottom: "20px" }}>{answer2.username}</div>
              <div>Хариулт:</div>
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
