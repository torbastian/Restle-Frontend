import { FaTrashAlt } from 'react-icons/fa';
import { useState } from 'react/cjs/react.development';
import DateDisplay from '../components/Date';
import MemberSelect from '../components/MemberSelect';
import { usePopup } from '../hooks/PopupContext';

function EditBoard(popupData) {
  const [title, setTitle] = useState(popupData.board.title);
  const [description, setDescription] = useState(popupData.board.description);
  const { createDialogue } = usePopup();

  function onSubmit(e) {
    e.preventDefault();

    const boardDetails = {
      title: title,
      description: description
    }

    popupData.submitAction(boardDetails);
    popupData.close();
  }

  function deleteDialogue() {
    createDialogue(`Vil du slette ${title}?`,
      { class: 'red', text: 'Slet' },
      popupData.cancelAction,
      () => deleteBoard()
    );
  }

  function deleteBoard() {
    console.log("deleteBoard");
    popupData.close();
    popupData.deleteAction(popupData.board);
  }

  function removeMember(selectedMembers) {
    if (!popupData.removeMemberAction) return;

    selectedMembers.forEach(member => {
      popupData.removeMemberAction(member);
    });
    console.log(selectedMembers);
  }

  function transferOwnership(selectedMembers) {
    console.log(selectedMembers);
  }

  return (
    <div className="edit-board">
      <div className="btn-container">
        <DateDisplay date={popupData.board.create_date} title={'Oprettet'} />
        <DateDisplay date={popupData.board.last_edited} title={'Sidst Redigeret'} />
      </div>
      <form className="frm" onSubmit={onSubmit}>
        <label>Titel</label>
        <input type="text" name="title" placeholder="Board Titel"
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
          members={popupData.board.members}
          transferOwnership={transferOwnership}
          removeMember={removeMember}
          cancelAction={popupData.cancelAction}
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

export default EditBoard;