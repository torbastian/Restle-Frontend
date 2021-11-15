import { FaCrown } from 'react-icons/fa';
import '../styles/UserIcon.scss';
import '../styles/AdminOverview.scss';

function UserElement({user}){
  return(
    <div class="userElement">
      <div class="UserIcon">
        {
          user !== null &&
          user.map((_user) =>
          <UserIcon  user={_user} onClick={() => seeLog()}/>)
        }
      </div>
      <div id="infoBox">
        <div class="info">
          <p>{user.first_name[0]}</p>
        </div>
        <div class="info">
          <p>{user.email[0]}</p>
        </div>
      </div>
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