import React from "react";
import { useState } from "react";

const CahtFactory = (chat) => {
  const { user, body } = chat.chat;

  return (
    <div className="chat-content">
      <div className="line">
        {user === "ai" ? (
          <span className="chat-box">{body}</span>
        ) : (
          <span className="chat-box mine">{body}</span>
        )}
      </div>
    </div>
  );
};

export default CahtFactory;
