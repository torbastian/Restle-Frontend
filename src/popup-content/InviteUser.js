import { FaSearch } from "react-icons/fa";
import { useState } from "react/cjs/react.development";

function InivteUser({ popupData }) {
  const [search, setSearch] = useState("");

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
        //setUser(data);
      })
    });
  }

  return (
    <div className="invite-user">
      <div className="search">
        <input type="text" onChange={(e) => setSearch(e.target.value)}></input>
        <button onClick={() => Search(search)}><FaSearch /></button>
      </div>
      INVITE USER
    </div>
  )
}

export default InivteUser;