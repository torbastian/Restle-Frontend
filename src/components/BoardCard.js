import '../styles/BoardCard.scss';
import DateDisplay from './Date';
import MeatballMenu from './MeatballMenu';

function BoardCard({ board }) {
  console.log(board);

  return (
    <div className="board-card">
      <div className="header">
        <h1>{board.title}</h1>
        <MeatballMenu />
      </div>
      <DateDisplay date={board.last_edited} />
      <p>{board.description}</p>
    </div>
  )
}

export default BoardCard;