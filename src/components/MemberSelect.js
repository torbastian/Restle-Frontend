import { useState } from "react/cjs/react.development";
import UserIcon from "./UserIcon";
import '../styles/MemberSelect.scss';
import { usePopup } from "../hooks/PopupContext";

function MemberSelect({ members, transferOwnership = undefined, removeMember = undefined, cancelAction = undefined }) {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { createDialogue } = usePopup();


  function selectMember(user) {
    let newMembers = [...selectedMembers];
    let index = newMembers.indexOf(user);

    if (index > -1) {
      newMembers.splice(index, 1);
    } else {
      newMembers.push(user);
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
              className={selectedMembers.includes(user) ? 'selected' : ''} />
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
                () => transferOwnership([...selectedMembers])
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
              areYouSure(`Vil du fjerne ${selectedMembers.length} medlemmer fra boardet?`,
                { class: 'red', text: 'Fjern' },
                () => removeMember([...selectedMembers])
              )}
            disabled={selectedMembers.length === 0}
            type='button'
          >
            Fjern Medlem
          </button>
        }
      </div>
    </div>
  )
}

export default MemberSelect;