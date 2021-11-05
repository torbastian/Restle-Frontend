import { useHistory } from 'react-router';
import '../styles/BoardCard.scss';
import DateDisplay from './Date';
import MeatballMenu from './MeatballMenu';

function BoardCard({ board }) {
  const history = useHistory();

  function navigateToBoard() {
    history.push(`/boards/${board._id}`);
  }

  return (
    <div className="board-card" onClick={navigateToBoard}>
      <div className="header">
        <h1>{board.title}</h1>
        <MeatballMenu />
      </div>
      <DateDisplay date={board.last_edited} />
      <p className="description">{board.description}</p>
    </div>
  )
}

export default BoardCard;