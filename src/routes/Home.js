import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { dbService } from "fbase";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getDbList = async () => {
    const q = query(collection(dbService, "nweets"));
    const querySnapshot = await getDocs(q);

    // console.log("db값 가져왔다", querySnapshot);

    querySnapshot.forEach((doc) => {
      // es6 spread attribute 기능
      const nweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getDbList();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log(`가긴했냐? ${nweet}`);
    if (nweet !== "") {
      let docRef;
      try {
        docRef = await addDoc(collection(dbService, "nweets"), {
          nweet: nweet,
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
          <div id={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
