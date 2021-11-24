import { FaTrashAlt, FaUserMinus, FaWrench } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { deleteBoard, inviteToBoard, LeaveBoard, RemoveFromBoard, TransferOwnership } from '../helpers/BoardHelper';
import { usePopup } from '../hooks/PopupContext';
import EditBoard from '../popup-content/EditBoard';
import InivteUser from '../popup-content/InviteUser';
import '../styles/BoardCard.scss';
import DateDisplay from './Date';
import MeatballMenu from './MeatballMenu';
import Members from './Members';

function BoardCard({ board, ws, memberBoard = false }) {
  const { createPopup, createDialogue, closePopup } = usePopup();

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

  function _deleteBoard() {
    closePopup();
    deleteBoard(ws, board._id);
  }

  function deleteDialogue() {
    createDialogue(`Vil du slette ${board.title}?`,
      { class: 'red', text: 'Slet' },
      undefined,
      () => _deleteBoard()
    );
  }

  function editBoard() {
    createPopup(
      <EditBoard
        board={board}
        cancelAction={editBoard}
        removeMember={_removeMember}
        transferOwnership={_transferOwnership}
      />,
      'Rediger Board',
      updateBoard);
  }

  function _transferOwnership(userId) {
    TransferOwnership(ws, board._id, userId);
  }

  function navigateToBoard() {
    history.push(`/boards/${board._id}`);
  }

  function _inviteMember(user) {
    inviteToBoard(ws, board._id, user._id);
  }

  function _removeMember(users) {
    RemoveFromBoard(ws, board._id, users);
  }

  function _leaveBoard() {
    console.log('LEAVE BOARD');
    LeaveBoard(ws, board._id);
    closePopup();
  }

  function leaveBoardDialogue() {
    createDialogue(`Forlad board ${board.title}?`,
      { class: 'red', text: 'Forlad' },
      undefined,
      () => _leaveBoard()
    );
  }

  function inviteMemberPopup() {
    createPopup(
      <InivteUser
        members={board.members}
        owner={board.owner}
        removeMember={_removeMember}
      />,
      'Inviter Medlem',
      _inviteMember
    )
  }

  return (
    <div className="board-card" onClick={navigateToBoard}>
      <div className="header">
        <h1>{board.title}</h1>
        {
          <MeatballMenu options={
            memberBoard ?
              [
                {
                  icon: <FaUserMinus />,
                  title: 'Forlad',
                  onClick: leaveBoardDialogue
                }
              ]
              :
              [
                {
                  icon: <FaWrench />,
                  title: 'Rediger',
                  onClick: editBoard
                },
                {
                  icon: <FaTrashAlt />,
                  title: 'Slet',
                  onClick: deleteDialogue
                }
              ]} />
        }
      </div>
      <DateDisplay date={board.last_edited} />
      <p className="description">{board.description}</p>
      <Members owner={board.owner} members={board.members} invite={memberBoard ? undefined : inviteMemberPopup} />
    </div>
  )
}

export default BoardCard;