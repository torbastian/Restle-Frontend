import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import List from "../components/List";
import Loading from '../components/Loading';
import Members from "../components/Members";
import { usePopup } from "../hooks/PopupContext";
import EditBoard from "../popup-content/EditBoard";
import NewCard from "../popup-content/NewCard";
import NewList from "../popup-content/NewList";
import '../styles/Board.scss';
import { BsArrowReturnRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Board() {
  const { createPopup } = usePopup();
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    //Forbind til websocket
    ws.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_CONNECTION);

    ws.current.onopen = () => {
      console.log("Connection to WS Established");

      //Send en forespørgelse om at abbonnere til brugerens boards
      ws.current.send(JSON.stringify({
        request: 'SUBSCRIBE_BOARD',
        boardId: id
      }));
    };

    ws.current.onmessage = (e) => {
      //Modtag data
      const data = JSON.parse(e.data);
      console.log(data);

      switch (data.response) {
        //Modtag board
        case 'BOARD_RESPONSE':
          if (data.board) {
            setBoard(data.board);
          }
          break;

        default:
          break;
      }
    }

    return () => {
      if (ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({
          request: 'UNSUBSCRIBE_BOARD',
          boardId: id
        }));
      }
    }

  }, []);

  function createNewList(newListDetails) {
    if (ws.current.readyState === WebSocket.OPEN) {
      console.log('New List');
      ws.current.send(JSON.stringify({
        request: 'NEW_LIST',
        boardId: board._id,
        details: newListDetails
      }));
    }
  }

  function createNewCard(newCardDetails, listId) {
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        request: 'NEW_CARD',
        listId: listId,
        details: newCardDetails
      }));
    }
  }

  function updateBoard() {

  }

  function newListDialogue() {
    createPopup(<NewList />, "Ny Liste", createNewList);
  }

  function newCardDialogue(listId) {
    createPopup(<NewCard listId={listId} />, "Ny Card", createNewCard);
  }

  function editBoardDialogue() {
    createPopup(<EditBoard board={board} />, 'Rediger Board', updateBoard);
  }

  if (board !== null) {
    return (
      <div className="board">
        <div className="board-title">
          <Link to={'/boards'} className={'back'}><BsArrowReturnRight /></Link>
          <h1>{board.title}</h1>
        </div>
        <div className="controls">
          <button className="btn" onClick={editBoardDialogue}>Rediger</button>
          <button className="btn" onClick={newListDialogue}>+ Ny Liste</button>
          <Members owner={board.owner} members={board.members} invite={true} />
        </div>

        <div className="list-container">
          {board.lists !== null &&
            board.lists.map((list, index) =>
              <List key={list._id} listDetails={list} ws={ws} newCardDialogue={newCardDialogue} />
            )
          }
        </div>
      </div>
    )
  } else {
    return (
      <Loading />
    )
  }
}

export default Board;