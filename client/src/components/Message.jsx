import React from "react";

export default function Message({ message, email }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isUser = email === userInfo.email;
  return (
    <div>
      <div
        className={`MessageBody  ${
          isUser ? "Message__user" : "Message__guest"
        }`}
      >
        <p>
          <strong>{email}: </strong>
          {message}
        </p>
      </div>
    </div>
  );
}
