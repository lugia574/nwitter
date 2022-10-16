import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { dbService } from "fbase";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
      const q = query(
        collection(dbService, "nweets"),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (snapshot) => {
        const nweetArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArr);
      });
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log(`가긴했냐? ${nweet}`);
    if (nweet !== "") {
      let docRef;
      try {
        docRef = await addDoc(collection(dbService, "nweets"), {
          text: nweet,
          createdId: userObj.uid,
          createdAt: Date.now(),
        });
      } catch (error) {
        console.log(error);
      }
      // console.log(docRef);
      setNweet("");
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="what's on your mind"
          maxLength={120}
          value={nweet}
          onChange={onChange}
        />
        <input type="submit" value="Nwitter" />
      </form>
      <div>
        {nweets.reverse().map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
