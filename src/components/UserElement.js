import { FaCrown } from 'react-icons/fa';
import '../styles/UserElement.scss';
import UserIcon from '../components/UserIcon';
import { IoMdCreate } from 'react-icons/io';

function UserElement({ user, onClick }) {
  return (
    <div className="userElement" onClick={onClick}>
      <div className="UserIcon">
        {user !== null && <UserIcon user={user} />}
      </div>
      <div className="infoBox">
        {user !== null && <p className="info">{user.first_name}</p>}
        {user !== null && <p className="info">{user.email}</p>}
      </div>
      <span className="icon">
        <IoMdCreate />
      </span>
    </div>
  )
}

export default UserElement;









/*
import { FaCrown } from 'react-icons/fa';
import '../styles/UserIcon.scss';

function UserIcon({ user, isOwner = false }) {
  const intials = user.first_name[0] + user.last_name[0];

  return (
    <span
      className={`user-icon ${isOwner ? 'owner' : ''}`}
      style={{
        borderColor: `${user.colour}`
      }}
    >
      {isOwner && <FaCrown className='crown' />}
      {intials.toUpperCase()}
    </span>
  )
}

export default UserIcon;*/