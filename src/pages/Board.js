import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import List from "../components/List";
import Loading from '../components/Loading';
import Members from "../components/Members";
import { usePopup } from "../hooks/PopupContext";
import { useHistory } from 'react-router';
import EditBoard from "../popup-content/EditBoard";
import NewCard from "../popup-content/NewCard";
import NewList from "../popup-content/NewList";
import '../styles/Board.scss';
import { BsArrowReturnRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { createNewCard, createNewList, deleteBoard, moveCard, moveList, updateBoard } from "../helpers/BoardHelper";
import { useCookies } from 'react-cookie';

function Board() {
  const { createPopup } = usePopup();
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies([id]);
  const history = useHistory();

  const ws = useRef(null);

  useEffect(() => {
    //Forbind til websocket
    ws.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_CONNECTION);

    ws.current.onopen = () => {
      console.log("Connection to WS Established");

      if (cookies.boardData !== undefined) {
        ws.current.send(JSON.stringify({
          request: 'SUBSCRIBE_BOARD_COOKIE',
          boardId: id,
          lastEdited: cookies.boardData.last_edited
        }))
      } else {
        //Send en forespørgelse om at abbonnere til brugerens boards
        ws.current.send(JSON.stringify({
          request: 'SUBSCRIBE_BOARD',
          boardId: id
        }));
      }

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
            setCookie('boardData', data.board, { path: '/', sameSite: 'strict' });
          }
          break;
        case 'BOARD_UP_TO_DATE':
          setBoard(cookies.boardData);
          break;
        case 'BOARD_DELETE':
          if (data.boardId === board._id) {
            history.push('/boards');
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

      ws.current.close();
    }

  }, []);

  function _createNewList(newListDetails) {
    createNewList(ws, board._id, newListDetails);
  }

  function _createNewCard(newCardDetails, listId) {
    createNewCard(ws, newCardDetails, board._id, listId);
  }

  function _updateBoard(boardDetails) {
    updateBoard(ws, board._id, boardDetails);
  }

  function _moveList(listToMove, destination) {
    moveList(ws, board._id, listToMove, destination)
  }

  function _moveCard(cardToMove, oldList, newList, destinationIndex) {
    moveCard(ws, board._id, cardToMove, oldList, newList, destinationIndex);
  }

  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (type === 'list') {
      //Opdater listernes rækkefølge
      var newLists = [...board.lists];
      var _removedList = newLists.splice(source.index, 1)[0];
      newLists.splice(destination.index, 0, _removedList);

      const newBoard = {
        ...board,
        lists: newLists
      }

      setBoard(newBoard);
      _moveList(_removedList._id, destination.index);
    } else if (type === 'card') {
      //Fjern kortet fra listen, og tilføj det til destinationen
      const listSource = board.lists.find(l => l._id === source.droppableId);
      const newCardsSource = [...listSource.cards];

      let _card = newCardsSource.splice(source.index, 1)[0];

      const newLists = [...board.lists];

      //Hvis destinationen og source er den samme, opdater en enkelt liste
      if (destination.droppableId === source.droppableId) {
        newCardsSource.splice(destination.index, 0, _card);

        const updatedList = {
          ...listSource,
          cards: newCardsSource
        }

        newLists[newLists.findIndex(l => l._id === source.droppableId)] = updatedList;
      } else {
        //Hvis destination og source ikke er det samme, opdater både source og destination
        const listDestination = board.lists.find(l => l._id === destination.droppableId);
        const newCardsDestination = [...listDestination.cards];

        newCardsDestination.splice(destination.index, 0, _card);

        const updatedSourceList = {
          ...listSource,
          cards: newCardsSource
        }

        const updatedDestinationList = {
          ...listDestination,
          cards: newCardsDestination
        }

        newLists[newLists.findIndex(l => l._id === source.droppableId)] = updatedSourceList;
        newLists[newLists.findIndex(l => l._id === destination.droppableId)] = updatedDestinationList;
      }

      const newBoard = {
        ...board,
        lists: newLists
      }

      setBoard(newBoard);
      _moveCard(draggableId, source.droppableId, destination.droppableId, destination.index);
    }
  }

  function _deleteBoard(board) {
    deleteBoard(ws, board._id);
  }

  function newListDialogue() {
    createPopup(<NewList />, "Ny Liste", _createNewList);
  }

  function newCardDialogue(listId) {
    createPopup(<NewCard listId={listId} />, "Ny Card", _createNewCard);
  }

  function editBoardDialogue() {
    createPopup(
      <EditBoard board={board}
        cancelAction={editBoardDialogue}
        deleteAction={_deleteBoard} />,
      'Rediger Board',
      _updateBoard
    );
  }

  if (board !== null) {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
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
          <Droppable
            droppableId={'list-droppable'}
            direction='horizontal'
            type='list'
          >
            {(provided) => (
              <div className="list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {board.lists !== null &&
                  board.lists.map((list, index) =>
                    <List
                      key={list._id}
                      index={index}
                      listDetails={list}
                      ws={ws}
                      newCardDialogue={newCardDialogue}
                    />
                  )}
                {provided.placeholder}
                {board.lists.length === 0 &&
                  <p>Tilføj en liste ved at trykke på Ny Liste</p>
                }
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    )
  } else {
    return (
      <Loading />
    )
  }
}

export default Board;