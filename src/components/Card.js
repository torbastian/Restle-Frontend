import { Draggable } from 'react-beautiful-dnd';
import { deleteCard, inviteToCard, removeFromCard, updateCard } from '../helpers/BoardHelper';
import { usePopup } from '../hooks/PopupContext';
import EditCard from '../popup-content/EditCard';
import InviteToCard from '../popup-content/InviteToCard';
import InivteUser from '../popup-content/InviteUser';
import '../styles/Card.scss';
import Members from './Members';

function Card({ cardDetails, ws, index, boardMembers }) {
  const { createPopup } = usePopup();

  function _updateCard(_cardDetails) {
    updateCard(ws, cardDetails.board, cardDetails._id, _cardDetails);
  }

  function _deleteCard(card) {
    deleteCard(ws, cardDetails.board, card._id);
  }

  function editCard() {
    createPopup(
      <EditCard
        card={cardDetails}
        deleteAction={_deleteCard}
        removeMemberAction={_removeMember}
      />,
      'Rediger Card',
      _updateCard)
  }

  function _removeMember(members) {
    removeFromCard(ws, cardDetails.board, cardDetails._id, members);
  }

  function _inviteMember(members) {
    inviteToCard(ws, cardDetails.board, cardDetails._id, members);
  }

  function addMember() {
    let availableMembers = [];

    for (let i = 0; i < boardMembers.length; i++) {
      const member = boardMembers[i];
      console.log(member);
      if (cardDetails.members.findIndex(m => m._id === member._id) === -1) {
        availableMembers.push(member);
      }
    }

    createPopup(
      <InviteToCard
        availableMembers={availableMembers}
        addMember={_inviteMember}
      />,
      'Inviter Medlemmer',
      _inviteMember
    )
  }

  return (
    <Draggable draggableId={cardDetails._id} index={index}>
      {(provided) => (
        <div className="card"
          {...provided.draggableProps}
          ref={provided.innerRef}
          onClick={editCard}
        >
          <div className="card-header" {...provided.dragHandleProps}>
            <h1>{cardDetails.title}</h1>
          </div>
          <div className="card-description">
            <p>{cardDetails.description}</p>
            <Members members={cardDetails.members} invite={addMember} />
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Card;