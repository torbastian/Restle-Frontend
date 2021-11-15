import { FaWrench } from 'react-icons/fa';
import { usePopup } from '../hooks/PopupContext';
import EditList from '../popup-content/EditList';
import '../styles/List.scss';
import Card from './Card';
import MeatballMenu from './MeatballMenu';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function List({ listDetails, newCardDialogue, ws, index }) {
  const { createPopup } = usePopup();

  function updateList(_listDetails) {
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        request: 'UPDATE_LIST',
        boardId: listDetails.board,
        listId: listDetails._id,
        details: _listDetails
      }));
    }
  }

  function editList() {
    createPopup(<EditList list={listDetails} />, 'Rediger List', updateList);
  }

  return (
    <Draggable
      draggableId={listDetails._id}
      index={index}
    >
      {(provided) => (
        <div className="list"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="list-header" {...provided.dragHandleProps}>
            <h1>{listDetails.title}</h1>
            <MeatballMenu options={[
              {
                icon: <FaWrench />,
                title: 'Edit',
                onClick: editList
              }
            ]} />
          </div>
          <div className="list-content">
            <Droppable droppableId={listDetails._id} type='card'>
              {(provided) => (
                <div className="card-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {listDetails.cards !== null &&
                    listDetails.cards.map((card, index) =>
                      <Card key={card._id} index={index} cardDetails={card} ws={ws} />
                    )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <button className="btn wide" onClick={() => newCardDialogue(listDetails._id)}>+</button>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default List;