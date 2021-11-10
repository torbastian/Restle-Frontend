import UserIcon from "./UserIcon";
import '../styles/Members.scss';

function Members({ owner = null, members = null, invite = false }) {
  return (
    <div className="members">
      {owner !== null &&
        <UserIcon user={owner} isOwner={true} />
      }
      {members !== null &&
        members.map((user, index) =>
          <UserIcon user={user} />
        )
      }
    </div>
  )
}

export default Members;