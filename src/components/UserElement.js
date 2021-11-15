import { FaCrown } from 'react-icons/fa';
import '../styles/UserIcon.scss';
import '../styles/AdminOverview.scss';
import UserIcon from '../components/UserIcon';
import {IoMdCreate} from 'react-icons/io';

function UserElement({user, onClick}){
  return(
    <div className="userElement" onClick={onClick}>
      <div className="UserIcon">
        <UserIcon  user={user} />
      </div>
      <div className="infoBox">
        <div className="info">
          <p>{user.first_name[0]}</p>
        </div>
        <div className="info">
          <p>{user.email[0]}</p>
        </div>
      </div>
      <div id="imgBox">
        <IoMdCreate/>
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