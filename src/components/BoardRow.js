import DateDisplay from "./Date";
import Members from "./Members";
import '../styles/BoardRow.scss';
import { FaPencilAlt } from "react-icons/fa";

function BoardRow({ board }) {
  return (
    <div className="board-row">
      <FaPencilAlt />
      <DateDisplay short={true} date={board.create_date} />
      <DateDisplay short={true} date={board.last_edited} />
      <p className="board-title">{board.title}</p>
      <Members owner={board.owner} members={board.members} invite={null} />
    </div>
  )
}

export default BoardRow;