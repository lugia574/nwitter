import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "../fbase";
import { dbService } from "fbase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
  // const NweetTextRef = doc(getFirestore(), `nweets/${nweetObj.id}`);
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
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.nweetImgUrl && (
            <img src={nweetObj.nweetImgUrl} width="100px" height="100px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
