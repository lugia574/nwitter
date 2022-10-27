import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";
import { v4 } from "uuid";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [preview, setPreview] = useState("");
  const fileInput = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    let nweetImgUrl = "";
    if (preview !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, preview, "data_url");
      nweetImgUrl = await getDownloadURL(response.ref);
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      nweetImgUrl,
    };

    if (nweet === "" || preview === "") {
      try {
        await addDoc(collection(dbService, "nweets"), nweetObj);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("입력값이 없습니다.");
    }

    setNweet("");
    setPreview("");
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
    setPreview("");
    console.log(typeof fileInput, "얍");
    fileInput.current.value = "";
  };
  return (
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
  );
};

export default NweetFactory;
