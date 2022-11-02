import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faGlasses,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <header>
    <nav>
      <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
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
      </ul>
    </nav>
  </header>
);

export default Navigation;
