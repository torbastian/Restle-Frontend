import '../styles/Card.scss';

function Card({ cardDetails }) {
  return (
    <div className="card">
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