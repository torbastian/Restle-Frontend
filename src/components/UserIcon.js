import { FaCrown } from 'react-icons/fa';
import '../styles/UserIcon.scss';

function UserIcon({ user, isOwner = false, onClick, className }) {
  const initials = user.first_name[0] + user.last_name[0];

  return (
    <span
      className={`${className} user-icon ${isOwner ? 'owner' : ''}`}
      style={{
        borderColor: `${user.colour}`
      }}
      onClick={onClick}
    >
      {isOwner && <FaCrown className='crown' />}
      {
        user.first_name[0] !== undefined
        && user.last_name[0] !== undefined
        && initials
        && initials.toUpperCase()
      }
    </span>
  )
}

export default UserIcon;