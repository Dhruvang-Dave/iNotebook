import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
const initialState = [
  {
      "_id": "63d3e19233a65874adac297e",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "First title",
      "description": "Very First",
      "tag": "general",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
  ,
  {
      "_id": "63d3e1a433a65874adac2980",
      "user": "63d38cba75fba1ce5bf53835",
      "title": "Second title",
      "description": "Very Second",
      "tag": "local",
      "date": "2023-01-27T14:36:55.921Z",
      "__v": 0
  }
]
console.log(props)
const [notes] = useState(initialState)
  return (
    <NoteContext.Provider value={{notes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
