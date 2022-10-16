import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { dbService } from "fbase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm("realy?");
    if (ok) {
      try {
        await deleteDoc(NweetTextRef);
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
