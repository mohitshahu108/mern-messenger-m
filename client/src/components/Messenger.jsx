import React, { useState, useEffect } from "react";
import Message from "./Message";
import axios from "axios";

export const Messenger = (props) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    props.history.push("/");
  }
  const email = userInfo.email;

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const logout = () => {
    localStorage.clear();
    props.history.push("/");
  };

  const sendtext = (e) => {
    e.preventDefault();
    axios
      .post("/api/messages", {
        email: email,
        message: text,
      })
      .then(function (responce) {
        console.log(responce.data);
        setIsUpdated(true);
      });
    setText("");
  };

  useEffect(() => {
    axios
      .get("/api/messages")
      .then((responce) => {
        setMessages(responce.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setIsUpdated(false);
  }, [isUpdated]);

  return (
    <div className="Messenger">
      <p className="Messenger__logout">
        {email}
        <button onClick={logout}>Logout</button>
      </p>
      <form className="Messenger__form">
        <label htmlFor="text"></label>
        <input
          type="text"
          id="text"
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" disabled={!text} onClick={sendtext}>
          Send
        </button>
      </form>
      <div className="Messager__messagebox">
        {messages.map((msg) => {
          return <Message key={msg._id} {...msg} />;
        })}
      </div>
    </div>
  );
};
