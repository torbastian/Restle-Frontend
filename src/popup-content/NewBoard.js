import { useState } from "react/cjs/react.development";

function NewBoard(popupData) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    const boardDetails = {
      title: title,
      description: description
    }

    popupData.submitAction(boardDetails);
  }

  return (
    <div className="new-board">
      <form className="frm" onSubmit={(e) => onSubmit(e)}>
        <label>Titel</label>
        <input type="text" name="title" placeholder="Board Title"
          maxLength="40"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Beskrivelse</label>
        <input type="text" name="description" placeholder="Description"
          maxLength="1024"
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="btn-container">
          <button className="btn" type="button" onClick={popupData.close}>Annuller</button>
          <button className="btn" type="submit" disabled={title.lenght < 3}>Opret</button>
        </div>
      </form>
    </div>
  )
}

export default NewBoard;