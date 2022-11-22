import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faComments,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Talke from "./Talke";

const Navigation = ({ userObj }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const TalkHandle = () => {
    setModalOpen(true);
  };
  return (
    <header>
      <nav>
        <ul
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <li className="home_icon">
            <Link to="/" style={{}} className="header-nav">
              <FontAwesomeIcon
                icon={faTwitter}
                color={"#ecf0f1"}
                size="2x"
                style={{ marginRight: 10 }}
              />
              홈으로
            </Link>
          </li>
          <li>
            <Link to="/profile" className="header-nav">
              <FontAwesomeIcon icon={faUser} color={"#ecf0f1"} size="2x" />
              설정
            </Link>
          </li>
          <li>
            <Link to="/setting" className="header-nav">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                color={"#ecfof1"}
                size="2x"
              />
              탐색하기
            </Link>
          </li>
          <li>
            <div className="talkOn" onClick={TalkHandle}>
              <FontAwesomeIcon icon={faComments} color={"#ecfof1"} size="2x" />
              대화하기
            </div>
          </li>
        </ul>
      </nav>
      <>{modalOpen && <Talke setModalOpen={setModalOpen} />}</>
    </header>
  );
};

export default Navigation;
