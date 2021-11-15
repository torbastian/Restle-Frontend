import { useState } from "react/cjs/react.development";
import DateDisplay from "../components/Date";

function EditList(popupData) {
  const [title, setTitle] = useState(popupData.list.title);

  function onSubmit(e) {
    e.preventDefault();

    const listDetails = {
      title: title
    }

    popupData.submitAction(listDetails);
    popupData.close();
  }

  return (
    <div className="edit-list">
      <form className="frm" onSubmit={onSubmit}>
        <div className="btn-container">
          <DateDisplay date={popupData.list.create_date} title={'Oprettet'} />
          <DateDisplay date={popupData.list.last_edited} title={'Sidst Redigeret'} />
        </div>
        <label>Titel</label>
        <input type="text" name="title" placeholder="List Titel"
          value={title}
          maxLength="40"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="btn-container">
          <button className="btn" type="button" onClick={popupData.close}>Annuller</button>
          <button className="btn blu" type="submit" disabled={title.length < 3}>Gem</button>
        </div>
      </form>
    </div>
  )
}

export default EditList;