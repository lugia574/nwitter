import { authService } from "fbase";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      //   provider = new firebaseInstance.auth.GoogleAuthProvider();
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      // provider = new firebaseInstance.auth.GithubAuthProvider();
      provider = new GithubAuthProvider();
    }
    // const data = await authService.signInWithPopup(provider);
    await signInWithPopup(authService, provider);
    // console.log(data);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#ecfof1"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm newAccount={newAccount} />
      <span className="sign" onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          <FontAwesomeIcon icon={faGoogle} />
          <span className="socialBtn">Continue with Google</span>
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          <FontAwesomeIcon icon={faGithub} size="x" />
          <span className="socialBtn">Continue with Github</span>
        </button>
      </div>
    </div>
  );
};
export default Auth;
