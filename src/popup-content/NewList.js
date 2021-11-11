import { useState } from "react/cjs/react.development";

function NewList(popupData) {
  const [title, setTitle] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    const listDetails = {
      title: title
    }

    popupData.submitAction(listDetails);
  }

  return (
    <div className="new-list">
      <form className="frm" onSubmit={onSubmit}>
        <label>Titel</label>
        <input type="text" name="title" placeholder="List Titel"
          maxLength="40"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="btn-container">
          <button className="btn" type="button" onClick={popupData.close}>Annuller</button>
          <button className="btn blu" type="submit" disabled={title.length < 3}>Opret</button>
        </div>
      </form>
    </div>
  )
}

export default NewList;