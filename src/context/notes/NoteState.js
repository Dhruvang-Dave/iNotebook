import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialState = [];
  const [notes, setNotes] = useState(initialState);

  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token")
      }
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // TODO APi call
    const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token")
      }
    });
    response.json();
    let newNotes = notes.filter((note) => {
        return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token")
      },
      body: JSON.stringify({ title, tag, description })
    });
    const json = await response.json();
    console.log(json);
    // Logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if( element._id === id){
        element.title = title;
        element.description = description;
        element.tag = tag;  
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;