import { useState } from "react/cjs/react.development";

function NewCard(popupData) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    const cardDetails = {
      title: title,
      description: description
    }

    popupData.submitAction(cardDetails, popupData.listId);
  }

  return (
    <div className="new-card">
      <form className="frm" onSubmit={onSubmit}>
        <label>Titel</label>
        <input type="text" name="title" placeholder="Card Titel"
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

export default NewCard;