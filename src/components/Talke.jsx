import React from "react";
import { useState } from "react";
import CahtFactory from "./chat";

const Talke = ({ setModalOpen, id, title, content, writer }) => {
  const [nowChat, setNowChat] = useState("좆");
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

  const createChat = async (event) => {
    event.preventDefault();
    const body = event.target.chatText.value;

    const newChat = { id: nextId, user: "mine", body };
    const newChats = [...chats];
    newChats.push(newChat);
    setChats(newChats);
    setNextId(nextId + 1);
    setNowChat("");
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
