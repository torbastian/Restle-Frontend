import { useRef, useState, useEffect } from "react";
import BoardCard from "../components/BoardCard";
import { createBoard, updateBoard } from "../helpers/BoardHelper";
import { usePopup } from "../hooks/PopupContext";
import NewBoard from "../popup-content/NewBoard";
import '../styles/BoardList.scss';

function BoardList() {
  const { createPopup } = usePopup();
  const [OwnedBoards, setOwnedBoards] = useState([]);
  const [MemberBoards, setMemberBoards] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    connectToWs();

    return () => {
      //Når siden bliver unloadet, send en forespørgelse om at unsubscribe og luk forbindelsen
      if (ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({
          request: 'USUBSCRIBE_BOARD_LIST'
        }));
      }

      ws.current.close();
    }
  }, []);


  function connectToWs() {
    //Forbind til websocket
    ws.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_CONNECTION);

    ws.current.onopen = () => {
      console.log("Connection to WS Established");
    };

    ws.current.onclose = function (e) {
      if (e.code !== 1005 && e.code !== 1008) {
        console.log('Lost connection to socket ', e.reason);
        setTimeout(function () {
          connectToWs();
        }, 1000);
      }

      if (e.code === 1008) {
        ws.current.onclose = function (e) {
          if (e.code !== 1005 && e.code !== 1008) {
            console.log('Lost connection to socket ', e.reason);
            setTimeout(function () {
              connectToWs();
            }, 1000);
          }

          if (e.code === 1008) {
            setMemberBoards([]);
            setOwnedBoards([]);
          }
        }
      }
    }

    ws.current.onmessage = (e) => {
      //Modtag data
      const data = JSON.parse(e.data);
      console.log(data);

      switch (data.response) {
        //Modtag boards
        case 'CONNECTED_READY':
          //Send en forespørgelse om at abbonnere til brugerens boards
          ws.current.send(JSON.stringify({
            request: 'SUBSCRIBE_BOARD_LIST'
          }));
          break;
        case 'BOARD_LIST_RESPONSE':
          if (data.owned !== undefined) {
            setOwnedBoards(data.owned);
          }

          console.log('MEMBER OF; ', data.memberOf);
          if (data.memberOf !== undefined) {
            setMemberBoards(data.memberOf);
          }
          break;
        case 'BOARD_LIST_UPDATE':
          if (data.owned !== undefined) {
            setOwnedBoards(OwnedBoards => (updateBoardState(data.owned, [...OwnedBoards])));
          }

          if (data.memberOf !== undefined) {
            console.log('UPDATE MEMBEROF');
            setMemberBoards(MemberBoards => (updateBoardState(data.memberOf, [...MemberBoards])));
          }
          break;
        case 'BOARD_DELETE':
          setOwnedBoards(OwnedBoards => (removeBoardFromState(data.boardId, [...OwnedBoards])));
          setMemberBoards(MemberBoards => (removeBoardFromState(data.boardId, [...MemberBoards])));
          break;
        default:
          break;
      }
    }
  }

  useEffect(() => {

  }, [OwnedBoards, MemberBoards]);

  function removeBoardFromState(boardId, _boards) {
    let boardIndex = _boards.findIndex(b => b._id === boardId);

    if (boardIndex !== -1) {
      _boards.splice(boardIndex, 1);
    }

    return _boards;
  }

  function updateBoardState(board, _boards) {
    let boardIndex = _boards.findIndex(b => b._id === board._id);

    if (boardIndex !== -1) {
      _boards[boardIndex] = board;
    } else {
      _boards.push(board);
    }

    return (_boards);
  }

  function _createNewBoard(newBoardDetails) {
    createBoard(ws, newBoardDetails);
  }

  function newBoardDialogue() {
    createPopup(<NewBoard />, "Ny Board", _createNewBoard);
  }

  return (
    <div className="board-list">
      <h1 className="title">
        Boards
      </h1>
      <section className="board-section">
        <div className="board-section-header">
          <h2>Dine Boards</h2>
          <div className="controls">
            <button className="btn" onClick={newBoardDialogue}>+ Ny Board</button>
          </div>
        </div>
        <div className="boards">
          {OwnedBoards !== [] &&
            OwnedBoards.map((board, index) =>
              <BoardCard
                key={board._id}
                board={board}
                ws={ws}
              />
            )
          }
        </div>
      </section>
      {
        MemberBoards !== [] && MemberBoards.length > 0 &&
        <section className="board-section">
          <div className="board-section-header">
            <h2>Medlem Boards</h2>
          </div>
          <div className="boards">
            {MemberBoards.map((board, index) =>
              <BoardCard
                key={board._id}
                board={board}
                ws={ws}
                memberBoard={true}
              />
            )
            }
          </div>
        </section>
      }
    </div>
  )
}

export default BoardList;