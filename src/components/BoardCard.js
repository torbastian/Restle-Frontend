import { FaWrench } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { usePopup } from '../hooks/PopupContext';
import EditBoard from '../popup-content/EditBoard';
import '../styles/BoardCard.scss';
import DateDisplay from './Date';
import MeatballMenu from './MeatballMenu';
import Members from './Members';

function BoardCard({ board, ws }) {
  const { createPopup } = usePopup();

  const history = useHistory();

  function updateBoard(boardDetails) {
    console.log(boardDetails);
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        request: 'UPDATE_BOARD',
        boardId: board._id,
        details: boardDetails
      }));
    }
  }

  function editBoard() {
    createPopup(
      <EditBoard
        board={board}
        cancelAction={editBoard}
      />,
      'Rediger Board',
      updateBoard);
  }

  function navigateToBoard() {
    history.push(`/boards/${board._id}`);
  }

  return (
    <div className="board-card" onClick={navigateToBoard}>
      <div className="header">
        <h1>{board.title}</h1>
        <MeatballMenu options={[
          {
            icon: <FaWrench />,
            title: 'Edit',
            onClick: editBoard
          }
        ]} />
      </div>
      <DateDisplay date={board.last_edited} />
      <p className="description">{board.description}</p>
      <Members owner={board.owner} members={board.members} />
    </div>
  )
}

export default BoardCard;