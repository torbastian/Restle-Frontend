import { FaWrench } from 'react-icons/fa';
import { usePopup } from '../hooks/PopupContext';
import EditList from '../popup-content/EditList';
import '../styles/List.scss';
import Card from './Card';
import MeatballMenu from './MeatballMenu';

function List({ listDetails, newCardDialogue, ws }) {
  const { createPopup } = usePopup();

  function updateList() {

  }

  function editList() {
    createPopup(<EditList list={listDetails} />, 'Rediger List', updateList);
  }

  return (
    <div className="list">
      <div className="list-header">
        <h1>{listDetails.title}</h1>
        <MeatballMenu options={[
          {
            icon: <FaWrench />,
            title: 'Edit',
            onClick: editList
          }
        ]} />
      </div>
      <div className="list-content">
        <div className="card-container">
          {listDetails.cards !== null &&
            listDetails.cards.map((card, index) =>
              <Card key={card._id} cardDetails={card} />
            )
          }
        </div>
        <button className="btn wide" onClick={() => newCardDialogue(listDetails._id)}>+</button>
      </div>
    </div>
  )
}

export default List;