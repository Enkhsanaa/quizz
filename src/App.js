import "./App.css";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  let history = useHistory();
  const getUserName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const getPassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const login = () => {
    fetch("http://sta.api.cashone.mn/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.role === 1) {
          history.push({
            pathname: "/one",

            state: { detail: res.token },
          });
        }
        if (res.role === 0) {
          history.push({
            pathname: "/admin",
            state: { detail: res.token },
          });
        }
      });
    console.log("qwe");
  };

  return (
    <div className="App">
      <div>Нэвтрэх хэсэг</div>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => getUserName(e)}
      ></input>
      <input
        type="text"
        placeholder="password"
        onChange={(e) => getPassword(e)}
      ></input>
      <button onClick={login}>Нэвтрэх</button>
    </div>
  );
}

export default App;
