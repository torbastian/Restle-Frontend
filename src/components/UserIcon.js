import { FaCrown } from 'react-icons/fa';
import '../styles/UserIcon.scss';

function UserIcon({ user, isOwner = false, onClick, className }) {
  const intials = user.first_name[0] + user.last_name[0];

  return (
    <span
      className={`${className} user-icon ${isOwner ? 'owner' : ''}`}
      style={{
        borderColor: `${user.colour}`
      }}
      onClick={onClick}
    >
      {isOwner && <FaCrown className='crown' />}
      {intials.toUpperCase()}
    </span>
  )
}

export default UserIcon;