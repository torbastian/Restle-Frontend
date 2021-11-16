import { useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { useState } from "react/cjs/react.development";
import BoardRow from "../components/BoardRow";

function AdminBoardOverview() {
  const [search, setSearch] = useState("");
  const [boards, SetBoards] = useState([]);

  useEffect(() => {
    getBoards();
  }, []);

  function searchBoards() {

  }

  function getBoards() {
    const requestBoards = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      }
    }

    fetch(process.env.REACT_APP_API_URL + '/board/admin', requestBoards)
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            console.log(data);
            SetBoards(data.boards);
          });
        } else {
          res.json().then(data => {
            console.log(data);
          })
        }
      });
  }

  return (
    <div className="admin-bord-overview">
      <h1 className="title">Bruger Boards Oversigt</h1>
      <div className="board-container">
        <div className="controls">
          <button className="btn"><FaFilter /></button>
          <button className="btn">Oprettet</button>
          <button className="btn">Ændret</button>
          <button className="btn">Title</button>
        </div>
        {boards !== [] &&
          boards.map((board, index) =>
            <BoardRow key={index} board={board} />
          )
        }
      </div>
    </div>
  )
}

export default AdminBoardOverview;