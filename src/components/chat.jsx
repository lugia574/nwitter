import React from "react";
import { useState } from "react";

const CahtFactory = (chat) => {
  const { user, body } = chat.chat;

  return (
    <div class="chat-content">
      <div class="line">
        {user === "ai" ? (
          <span class="chat-box">{body}</span>
        ) : (
          <span class="chat-box mine">{body}</span>
        )}
      </div>
    </div>
  );
};

export default CahtFactory;
