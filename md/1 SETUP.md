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
