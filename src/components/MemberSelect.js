import { useState } from "react/cjs/react.development";
import UserIcon from "./UserIcon";
import '../styles/MemberSelect.scss';
import { usePopup } from "../hooks/PopupContext";

function MemberSelect({
  members,
  transferOwnership = undefined,
  removeMember = undefined,
  cancelAction = undefined,
  addMember = undefined }) {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { createDialogue } = usePopup();


  function selectMember(user) {
    let newMembers = [...selectedMembers];
    let index = newMembers.indexOf(user._id);

    if (index > -1) {
      newMembers.splice(index, 1);
    } else {
      newMembers.push(user._id);
    }

    setSelectedMembers(newMembers);
  }

  function areYouSure(title, confirmButton, submitAction) {
    createDialogue(title, confirmButton, cancelAction, submitAction);
  }

  return (
    <div className="member-select">
      <p className="member-title">Medlemmer</p>
      <div className="member-container">
        {members !== null &&
          members.map((user, index) =>
            <UserIcon
              key={index}
              user={user}
              onClick={() => selectMember(user)}
              className={selectedMembers.includes(user._id) ? 'selected' : ''} />
          )
        }
      </div>
      <p className="member-counter">Valgt {selectedMembers.length} af {members.length}</p>
      <div className="btn-container">
        {
          transferOwnership !== undefined &&
          <button
            className="btn ylw"
            onClick={() =>
              areYouSure(`Vil du overføre ejerskab til ${selectedMembers[0].first_name}?`,
                { class: 'ylw', text: 'Overfør' },
                () => transferOwnership(selectedMembers[0])
              )}
            disabled={selectedMembers.length !== 1}
            type='button'
          >
            Overfør Ejerskab
          </button>
        }
        {
          removeMember !== undefined &&
          <button
            className="btn red"
            onClick={() =>
              areYouSure(`Vil du fjerne ${selectedMembers.length} medlemmer?`,
                { class: 'red', text: 'Fjern' },
                () => removeMember(selectedMembers)
              )}
            disabled={selectedMembers.length === 0}
            type='button'
          >
            Fjern Medlem
          </button>
        }
        {
          addMember !== undefined &&
          <button className="btn blu"
            onClick={() => addMember([...selectedMembers])}
            disabled={selectedMembers.length === 0}
            type='button'
          >
            Tilføj Medlem
          </button>
        }
      </div>
    </div>
  )
}

export default MemberSelect;