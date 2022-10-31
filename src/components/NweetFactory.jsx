import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

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
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
        style={{
          opacity: 0,
        }}
      />
      {preview && (
        <div className="factoryForm__attachment">
          <img
            src={preview}
            alt=""
            style={{
              backgroundImage: preview,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearPreview}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
