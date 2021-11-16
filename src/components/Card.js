import { Draggable } from 'react-beautiful-dnd';
import { deleteCard, updateCard } from '../helpers/BoardHelper';
import { usePopup } from '../hooks/PopupContext';
import EditCard from '../popup-content/EditCard';
import '../styles/Card.scss';
import Members from './Members';

function Card({ cardDetails, ws, index }) {
  const { createPopup } = usePopup();

  function _updateCard(_cardDetails) {
    updateCard(ws, cardDetails.board, cardDetails._id, _cardDetails);
  }

  function _deleteCard(card) {
    deleteCard(ws, card._id);
  }

  function editCard() {
    createPopup(<EditCard card={cardDetails} deleteAction={_deleteCard} />, 'Rediger Card', _updateCard)
  }

  function addMember() {
    createPopup(<div>Invite</div>, 'Tilføj Medlem', undefined);
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