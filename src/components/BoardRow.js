import DateDisplay from "./Date";
import Members from "./Members";
import '../styles/BoardRow.scss';
import { FaPencilAlt } from "react-icons/fa";
import { usePopup } from "../hooks/PopupContext";
import EditBoard from "../popup-content/EditBoard";
import { createNewCard, createNewList, deleteBoard, inviteToBoard, moveCard, moveList, RemoveFromBoard, TransferOwnership, updateBoard } from "../helpers/BoardHelper";
import { Link } from "react-router-dom";
import InivteUser from "../popup-content/InviteUser";

function BoardRow({ board, ws, sync }) {
  const { createPopup } = usePopup();

  function _deleteBoard() {
    deleteBoard(ws, board._id);
    sync();
  }

  function _updateBoard(boardDetails) {
    updateBoard(ws, board._id, boardDetails);
    sync();
  }

  function _removeMember(users) {
    RemoveFromBoard(ws, board._id, users);
    sync();
  }

  function _inviteMember(user) {
    inviteToBoard(ws, board._id, user._id);
    sync();
  }

  function editBoardDialogue(e) {
    e.stopPropagation();

    createPopup(
      <EditBoard board={board}
        cancelAction={editBoardDialogue}
        deleteAction={_deleteBoard}
      />,
      'Rediger Board',
      _updateBoard
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
    <div className="board-row">
      <button className="edit" onClick={editBoardDialogue}><FaPencilAlt /></button>
      <DateDisplay short={true} date={board.create_date} />
      <DateDisplay short={true} date={board.last_edited} />
      <Link className="board-title" to={`/boards/${board._id}`}>{board.title}</Link>
      <Members owner={board.owner} members={board.members} invite={inviteMemberPopup} />
    </div>
  )
}

export default BoardRow;