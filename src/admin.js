import React, { useEffect, useState } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";

function Admin() {
  let history = useHistory();
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [score, setScore] = useState([]);
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
      });
  };

  const teamScore = () => {
    // console.log(score);
  };
  return (
    <div>
      <button onClick={getNext}>Дараагийн асуулт</button>

      <button onClick={teamScore}>Oноо авах</button>
    </div>
  );
}

export default withRouter(Admin);
