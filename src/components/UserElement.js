import { FaCrown, FaPlus, FaTimes } from 'react-icons/fa';
import '../styles/UserElement.scss';
import UserIcon from '../components/UserIcon';
import { IoMdCreate } from 'react-icons/io';

function UserElement({ user, onClick, invite = false, isMember = false, isOwner = false }) {
  function returnIcon() {
    if (!invite) return <IoMdCreate />

    if (isOwner) return <FaCrown />

    if (isMember) return <FaTimes />

    return <FaPlus />
  }

  return (
    <div className={`userElement ${isMember ? 'member' : ''} ${isOwner ? 'owner' : ''}`} onClick={onClick}>
      {user !== null && <UserIcon user={user} />}
      <div className="infoBox">
        {user !== null && <p className="info">{user.first_name}</p>}
        {user !== null && <p className="info">{user.email}</p>}
      </div>
      <span className="icon">
        {returnIcon()}
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