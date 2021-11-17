import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react/cjs/react.development";
import DateDisplay from "../components/Date";
import MemberSelect from "../components/MemberSelect";
import { usePopup } from "../hooks/PopupContext";

function EditCard(popupData) {
  const [title, setTitle] = useState(popupData.card.title);
  const [description, setDescription] = useState(popupData.card.description);
  const { createDialogue } = usePopup();

  function onSubmit(e) {
    e.preventDefault();

    const cardDetails = {
      title: title,
      description: description
    }

    popupData.submitAction(cardDetails);
    popupData.close();
  }

  function deleteDialogue() {
    createDialogue(`Vil du slette ${title}?`,
      { class: 'red', text: 'Slet' },
      popupData.cancelAction,
      () => deleteCard()
    );
  }

  function deleteCard() {
    popupData.close();
    popupData.deleteAction(popupData.card);
  }

  function removeMember(selectedMembers) {
    console.log(selectedMembers);
  }

  return (
    <div className="edit-card">
      <div className="btn-container">
        <DateDisplay date={popupData.card.create_date} title={'Oprettet'} />
        <DateDisplay date={popupData.card.last_edited} title={'Sidst Redigeret'} />
      </div>
      <form className="frm" onSubmit={onSubmit}>
        <label>Titel</label>
        <input type="text" name="title" placeholder="Card Titel"
          value={title}
          maxLength="40"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Beskrivelse</label>
        <textarea name="description" placeholder="Beskrivelse"
          value={description}
          maxLength="1024"
          onChange={(e) => setDescription(e.target.value)}
        />

        <MemberSelect
          members={[
            { first_name: 'test', last_name: 'test', colour: '#fff' },
            { first_name: 'test', last_name: 'test', colour: '#fff' }
          ]}
          removeMember={removeMember}
        />
        <button className="btn red delete" type="button" onClick={deleteDialogue}><FaTrashAlt />Slet</button>

        <div className="btn-container">
          <button className="btn" type="button" onClick={popupData.close}>Annuller</button>
          <button className="btn blu" type="submit" disabled={title.length < 3}>Gem</button>
        </div>
      </form>
    </div>
  )
}

export default EditCard;