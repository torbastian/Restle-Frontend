import { useState } from 'react/cjs/react.development';
import DateDisplay from '../components/Date';
import MemberSelect from '../components/MemberSelect';

function EditBoard(popupData) {
  const [title, setTitle] = useState(popupData.board.title);
  const [description, setDescription] = useState(popupData.board.description);

  function onSubmit(e) {
    e.preventDefault();

    const boardDetails = {
      title: title,
      description: description
    }

    popupData.submitAction(boardDetails);
    popupData.close();
  }

  function removeMember(selectedMembers) {
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
          members={[
            { first_name: 'test', last_name: 'test', colour: '#fff' },
            { first_name: 'test', last_name: 'test', colour: '#fff' }
          ]}
          transferOwnership={transferOwnership}
          removeMember={removeMember}
          cancelAction={popupData.cancelAction}
        />

        <div className="btn-container">
          <button className="btn" type="button" onClick={popupData.close}>Annuller</button>
          <button className="btn blu" type="submit" disabled={title.length < 3}>Gem</button>
        </div>
      </form>
    </div>
  )
}

export default EditBoard;