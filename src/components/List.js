import { FaTrashAlt, FaWrench } from 'react-icons/fa';
import { usePopup } from '../hooks/PopupContext';
import EditList from '../popup-content/EditList';
import '../styles/List.scss';
import Card from './Card';
import MeatballMenu from './MeatballMenu';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { deleteList, updateList } from '../helpers/BoardHelper';

function List({ listDetails, newCardDialogue, ws, index, boardMembers, isOwner = false }) {
  const { createPopup, createDialogue, closePopup } = usePopup();

  function _updateList(_listDetails) {
    updateList(ws, listDetails.board, listDetails._id, _listDetails);
  }

  function deleteDialogue() {
    createDialogue(`Vil du slette ${listDetails.title}?`,
      { class: 'red', text: 'Slet' },
      undefined,
      () => {
        closePopup();
        _deleteList(listDetails);
      }
    );
  }

  function _deleteList(list) {
    deleteList(ws, listDetails.board, list._id);
  }

  function editList() {
    createPopup(<EditList list={listDetails} deleteAction={_deleteList} />, 'Rediger List', _updateList);
  }

  return (
    <Draggable
      draggableId={listDetails._id}
      index={index}
      isDragDisabled={!isOwner}
    >
      {(provided) => (
        <div className="list"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="list-header" {...provided.dragHandleProps}>
            <h1>{listDetails.title}</h1>
            {isOwner &&
              <MeatballMenu options={[
                {
                  icon: <FaWrench />,
                  title: 'Rediger',
                  onClick: editList
                },
                {
                  icon: <FaTrashAlt />,
                  title: 'Slet',
                  onClick: deleteDialogue
                }
              ]} />
            }
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
                      <Card key={card._id} index={index} cardDetails={card} ws={ws} boardMembers={boardMembers} />
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