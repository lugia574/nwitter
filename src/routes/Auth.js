import { authService } from "fbase";
import React, { useState } from "react";

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
    <div>
      <AuthForm newAccount={newAccount} />
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
