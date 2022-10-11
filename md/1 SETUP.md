# SETUP

## 1.0 React + Firebase Setup

자 세팅을 해보자

우선 프로젝트 생성 ㄱㄱ

파워셀 키고

```
npx create-react-app 프로젝트이름
```

그리고 깃헙에다가도 프젝 생성 ㄱㄱㄱ

파워셀 생성이 끝났음

```
code 프로젝트이름
```

하면 vs 코드로 딱 실행이 됨

거기서 쓸데 없는 것들 css, logo, setupTest 이런것들 싹 지우고

app.js, index.js 만 남겨

그리고 이제 깃헙에다가 연결을 하자

```
git remote add origin https://github.com/lugia574/nwitter(프젝 주소)
git add.
git commit -m "메모 내용"

git push origin master
```

이럼 됨

그리고 나서 이제 Firebase 에 프젝 생성을 함

이건 영상 보고 하는게 나음 그런 이유로 생략

## 1.1 Securing the Keys

키를 숨기자

그냥 막 드러내면 안되영

React.js 의 경우 환경변수을 쓸꺼면

REACT_APP_OOOOO 이런식으로 써야함

그래서

`.env`

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGIN_ID=
REACT_APP_APP_ID=
```

이렇게 하고 해당 변수를 줄꺼임

```js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
```

## 1.2 Router Setup

이제 라우터를 하자

components, routers 폴더 만들기 ㄱㄱ

그리고 `App.js` 을 components에 옮겨줘

routers 에는 이제 설정할 route들을 생성할꺼임

이번 프젝에서 만들 route 는 총 4개임

- Authentication 인증

- Home 메인

- Profile 개인 프로필

- EditProfile 프로필 수정

이렇게 될꺼임

자 npm 으로 설치 ㄱㄱ

```
npm i react-router-dom@5.3.0
```

```js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
```

여기서 <> 이게 뭐냐면

Fragment 인데

많은 요소들을 render 하고 싶을때 사용함

https://7942yongdae.tistory.com/88
