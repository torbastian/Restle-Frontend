import '../styles/List.scss';
import Card from './Card';
import MeatballMenu from './MeatballMenu';

function List({ listDetails, newCardDialogue }) {

  return (
    <div className="list">
      <div className="list-header">
        <h1>{listDetails.title}</h1>
        <MeatballMenu />
      </div>
      <div className="card-container">
        {listDetails.cards !== null &&
          listDetails.cards.map((card, index) =>
            <Card key={card._id} cardDetails={card} />
          )
        }
      </div>
      <button className="btn wide" onClick={() => newCardDialogue(listDetails._id)}>+</button>
    </div>
  )
}

export default List;