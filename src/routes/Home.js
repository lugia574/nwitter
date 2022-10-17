import React, { useEffect, useRef, useState } from "react";
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
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [preview, setPreview] = useState();
  const fileInput = useRef();

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
    } else {
      alert("입력값이 없습니다.");
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const thefile = files[0];
    if (thefile !== undefined) {
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setPreview(result);
      };
      reader.readAsDataURL(thefile);
    }
  };
  const onClearPreview = () => {
    setPreview(null);
    fileInput.current.value = "";
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
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Nwitter" />
        {preview && (
          <div>
            <img src={preview} alt="" width="100px" height="100px" />
            <button onClick={onClearPreview}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.reverse().map((nweet) => (
          <Nweet
            nweetObj={nweet}
            key={nweet.id}
            isOwner={nweet.createdId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
