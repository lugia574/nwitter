import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "../fbase";
import { dbService } from "fbase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const MainNweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
  const imgRef = ref(storageService, nweetObj.nweetImgUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm("realy?");
    if (ok) {
      try {
        await deleteDoc(NweetTextRef);
        if (nweetObj.nweetImgUrl !== "") {
          await deleteObject(imgRef);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateDoc(NweetTextRef, {
        text: newNweet,
      });
    } catch (error) {
      console.log(error);
    }

    setEditing(false);
  };

  const onChange = (event) => setNewNweet(event.target.value);
  return (
    <div className="main-nweet">
      <>
        {nweetObj.nweetImgUrl && (
          <img className="main-nweet-img" src={nweetObj.nweetImgUrl} />
        )}
        <span className="main-nweet-title">{nweetObj.text}</span>
      </>
    </div>
  );
};

export default MainNweet;
