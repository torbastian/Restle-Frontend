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
    popupData.close();
  }

  return (
    <div className="new-board">
      <form className="frm" onSubmit={onSubmit}>
        <label>Titel</label>
        <input type="text" name="title" placeholder="Board Titel"
          maxLength="40"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Beskrivelse</label>
        <textarea name="description" placeholder="Beskrivelse"
          maxLength="1024"
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="btn-container">
          <button className="btn" type="button" onClick={popupData.close}>Annuller</button>
          <button className="btn blu" type="submit" disabled={title.length < 3}>Opret</button>
        </div>
      </form>
    </div>
  )
}

export default NewBoard;