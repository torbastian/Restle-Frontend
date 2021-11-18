import { FaSearch } from "react-icons/fa";
import { useState } from "react/cjs/react.development";
import UserElement from '../components/UserElement';

function InivteUser(popupData) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState(popupData.members);
  const [owner, setOwner] = useState(popupData.owner ? popupData.owner : null);

  function Search(input) {
    const requestData = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      }
    };

    const params = { search: input };
    const url = new URL(process.env.REACT_APP_API_URL + '/user/findUser');
    url.search = new URLSearchParams(params).toString();

    fetch(url, requestData).then(res => {
      res.json().then(data => {
        console.log("data ", data)
        setUsers(data);
      })
    });
  }

  function invite(user) {
    if (owner && user._id === owner._id) return;

    if (members.findIndex(u => u._id === user._id) !== -1 && popupData.removeMember !== undefined) {
      popupData.removeMember(user);
      return;
    }
    popupData.submitAction(user);
  }

  return (
    <div className="invite-user">
      <div className="search">
        <input type="text" onChange={(e) => setSearch(e.target.value)}></input>
        <button onClick={() => Search(search)}><FaSearch /></button>
      </div>
      <div className="user-container">
        {users.map((user, index) =>
          <UserElement key={index} user={user} invite={true} onClick={() => invite(user)} isMember={members.findIndex(u => u._id === user._id) !== -1} isOwner={owner && user._id === owner._id} />
        )}
      </div>
    </div>
  )
}

export default InivteUser;