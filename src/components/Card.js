import { usePopup } from '../hooks/PopupContext';
import EditCard from '../popup-content/EditCard';
import '../styles/Card.scss';

function Card({ cardDetails, ws }) {
  const { createPopup } = usePopup();

  function updateCard(_cardDetails) {
    console.log(_cardDetails);
  }

  function editCard() {
    createPopup(<EditCard card={cardDetails} />, 'Rediger Card', updateCard)
  }

  return (
    <div className="card" onClick={editCard}>
      <div className="card-header">
        <h1>{cardDetails.title}</h1>
      </div>
      <div className="card-description">
        <p>{cardDetails.description !== null && cardDetails.description}</p>
      </div>
    </div>
  )
}

export default Card;