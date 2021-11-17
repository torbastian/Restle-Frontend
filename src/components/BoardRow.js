import DateDisplay from "./Date";
import Members from "./Members";
import '../styles/BoardRow.scss';
import { FaPencilAlt } from "react-icons/fa";
import { usePopup } from "../hooks/PopupContext";
import EditBoard from "../popup-content/EditBoard";
import { deleteBoard, updateBoard } from "../helpers/BoardHelper";
import { Link } from "react-router-dom";

function BoardRow({ board, ws }) {
  const { createPopup } = usePopup();

  function _deleteBoard() {
    deleteBoard(ws, board._id);
  }

  function _updateBoard(boardDetails) {
    updateBoard(ws, board._id, boardDetails);
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

  return (
    <div className="board-row">
      <button className="edit" onClick={editBoardDialogue}><FaPencilAlt /></button>
      <DateDisplay short={true} date={board.create_date} />
      <DateDisplay short={true} date={board.last_edited} />
      <Link className="board-title" to={`/boards/${board._id}`}>{board.title}</Link>
      <Members owner={board.owner} members={board.members} invite={() => { }} />
    </div>
  )
}

export default BoardRow;