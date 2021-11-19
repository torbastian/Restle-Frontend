import UserIcon from "./UserIcon";
import '../styles/Members.scss';

function Members({ owner = null, members = null, invite = undefined, className = '' }) {

  function onClick(e) {
    e.stopPropagation();

    if (invite !== undefined) {
      invite();
    }
  }

  return (
    <div className={`members ${className}`}>
      {owner !== null &&
        <UserIcon user={owner} isOwner={true} />
      }
      {members !== null &&
        members.map((user, index) =>
          <UserIcon key={index} user={user} />
        )
      }
      {
        invite !== undefined &&
        <button className="user-icon" onClick={onClick}>+</button>
      }
    </div>
  )
}

export default Members;