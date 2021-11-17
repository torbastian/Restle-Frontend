import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaFilter, FaSearch, FaSync } from "react-icons/fa";
import BoardRow from "../components/BoardRow";
import '../styles/AdminBoardOverview.scss';

function AdminBoardOverview() {
  const [search, setSearch] = useState("");
  const [boards, setBoards] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('title');
  const [selectedSort, setSelectedSort] = useState('last_edited');
  const [desc, setDesc] = useState(true);
  const terms = [{ title: 'Titel', value: 'title' }, { title: 'Medlem', value: 'member' }, { title: 'Ejer', value: 'owner' }];
  const sorts = [{ title: 'Oprettet', value: 'create_date' }, { title: 'Ændret', value: 'last_edited' }, { title: 'Titel', value: 'title' }];

  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_CONNECTION);

    ws.current.onopen = () => {
      console.log('Connection to WS Established');
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);

      switch (data.response) {
        case 'CONNECTED_READY':
          getBoards();
          break;
        case 'ADMIN_BOARD_RESPONSE':
          if (data.result) {
            setBoards(data.result.boards);
            setTotalPages(data.result.totalPages);
            setCurrentPage(data.result.currentPage);
          }
          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    sync();
  }, [selectedSort, desc]);

  function sortHandler(value) {
    if (selectedSort === value) {
      setDesc(currentState => !currentState);
    } else {
      setSelectedSort(value)
    }
  }

  function sync() {
    if (filter) {
      searchBoards();
    } else {
      getBoards();
    }
  }

  function searchBoards() {
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        request: 'GET_ADMIN_BOARD_OVERVIEW',
        query: {
          sort: selectedSort,
          page: currentPage,
          term: selectedTerm,
          search: search,
          order: desc ? -1 : 1
        }
      }));
    }
  }

  function getBoards() {
    console.log(selectedSort, currentPage, desc);
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        request: 'GET_ADMIN_BOARD_OVERVIEW',
        query: {
          sort: selectedSort,
          page: currentPage,
          order: desc ? -1 : 1
        }
      }));
    }
  }

  return (
    <div className="admin-bord-overview">
      <h1 className="title">Bruger Boards Oversigt</h1>
      <div className="board-container">
        <div className={`filter ${!filter && 'hidden'}`}>
          <div className="search">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={searchBoards}><FaSearch /></button>
          </div>
          {terms.map((term, index) =>
            [
              <input key={index} type="radio"
                id={term.value} name="term"
                value={term.value}
                checked={selectedTerm === term.value}
                onChange={(e) => setSelectedTerm(e.target.value)}
              />,
              <label key={term.value} for={term.value} className={selectedTerm === term.value && 'checked'}>{term.title}</label>
            ]
          )}
        </div>
        <div className="controls">
          <button className="btn" onClick={() => setFilter(!filter)}><FaFilter /></button>
          {sorts.map((sort, index) =>
            <button
              key={index}
              className={`btn sort ${desc ? 'desc' : 'asc'}`}
              onClick={() => sortHandler(sort.value)}
            >
              {sort.value === selectedSort && <FaChevronDown />}
              {sort.title}
            </button>
          )}
          <button className="btn right" onClick={sync}><FaSync /></button>
        </div>
        {boards !== [] &&
          boards.map((board, index) =>
            <BoardRow key={index} ws={ws} board={board} />
          )
        }
      </div>
    </div>
  )
}

export default AdminBoardOverview;