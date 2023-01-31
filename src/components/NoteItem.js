import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { note, updateNote } = props;
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card m-1" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex align-items-baseline">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-sharp fa-solid fa-trash mx-2 justify-content-between" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted successfully", "success");}}></i>
            <i className="fa-solid fa-pen mx-2" onClick={()=>{updateNote(note )}}></i>
          </div>
            <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
