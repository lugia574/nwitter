import { async } from "@firebase/util";
import React from "react";
import { useState } from "react";
import CahtFactory from "./chat";

const Talke = ({ setModalOpen }) => {
  const { Configuration, OpenAIApi } = require("openai");
  const [nowChat, setNowChat] = useState("");
  const [chats, setChats] = useState([
    { id: 1, user: "ai", body: "안녕?" },
    { id: 2, user: "mine", body: "안녕" },
  ]);
  const [nextId, setNextId] = useState(3);
  let chatList = chats.map((chat) => <CahtFactory key={chat.id} chat={chat} />);
  const chatHandle = (event) => {
    const chat = event.target.value;
    setNowChat(chat);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const createChat = (event) => {
    event.preventDefault();
    const body = event.target.chatText.value;
    const user = "mine";

    const newChat = { id: nextId, user, body };
    const newChats = [...chats];
    newChats.push(newChat);
    setChats(newChats);
    setNextId(nextId + 1);
    setNowChat("");
    aiGo();
  };

  const createAiChat = (text) => {
    console.log("생성으로 넘어갔습니다~", text);
    const body = text;
    const user = "ai";

    const newChat = { id: nextId, user, body };
    const newChats = [...chats];
    newChats.push(newChat);
    setChats(newChats);
    setNextId(nextId + 1);
  };

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const aiGo = async () => {
    const result = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: nowChat,
      temperature: 0.7,
      max_tokens: 128,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const re = result.data.choices[0].text;
    createAiChat(re);
  };

  return (
    <div className="chatContainer">
      <div className="chat-wrap" id="chatWrap">
        <button className="close" onClick={closeModal}>
          ✖
        </button>
        <div className="chat">
          {chatList}
          <div className="inputContainer">
            <form onSubmit={createChat} className="chatForm">
              <input
                type="text"
                name="chatText"
                className="chatInput"
                placeholder="입력하세요"
                value={nowChat}
                onChange={chatHandle}
              ></input>
              <input type="submit" className="chatSubmit" value="전송" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talke;
