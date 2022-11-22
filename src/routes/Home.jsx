import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { authService, dbService } from "fbase";
import Nweet from "components/Nweet";
import MainNweet from "components/MainNweet";
import NweetFactory from "components/NweetFactory";
import { onAuthStateChanged } from "firebase/auth";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
  }, []);
  const listItems = nweets
    .reverse()
    .map((nweet, index) => (
      <>
        {
          <Nweet
            nweetObj={nweet}
            key={nweet.id}
            isOwner={nweet.creatorId === userObj.uid}
          />
        }
      </>
    ));

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <>{listItems}</>
    </div>
  );
};
export default Home;

// index === 0 ? (
//   <MainNweet
//     nweetObj={nweet}
//     key={nweet.id}
//     isOwner={nweet.creatorId === userObj.uid}
//   />
// ) :
