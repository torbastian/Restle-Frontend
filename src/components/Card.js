import { Draggable } from 'react-beautiful-dnd';
import { usePopup } from '../hooks/PopupContext';
import EditCard from '../popup-content/EditCard';
import '../styles/Card.scss';
import Members from './Members';

function Card({ cardDetails, ws, index }) {
  const { createPopup } = usePopup();

  function updateCard(_cardDetails) {
    console.log(_cardDetails);
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        request: 'UPDATE_CARD',
        boardId: cardDetails.board,
        cardId: cardDetails._id,
        details: _cardDetails
      }));
    }
  }

  function editCard() {
    createPopup(<EditCard card={cardDetails} />, 'Rediger Card', updateCard)
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