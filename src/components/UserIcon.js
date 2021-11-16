import { FaCrown } from 'react-icons/fa';
import '../styles/UserIcon.scss';

function UserIcon({ user, isOwner = false, onClick, className }) {

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
        && user.first_name[0].toUpperCase() + user.first_name[0].toUpperCase()
      }
    </span>
  )
}

export default UserIcon;