import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { dbService } from "fbase";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(`가긴했냐? ${nweet}`);
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
      console.log(docRef);
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
    </div>
  );
};
export default Home;
