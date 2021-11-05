import { useRef, useState, useEffect } from "react";
import BoardCard from "../components/BoardCard";
import { usePopup } from "../hooks/PopupContext";
import NewBoard from "../popup-content/NewBoard";
import '../styles/BoardList.scss';

function BoardList() {
  const { createPopup } = usePopup();
  const [OwnedBoards, setOwnedBoards] = useState(null);
  const [MemberBoards, setMemberBoards] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    //Forbind til websocket
    ws.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_CONNECTION);

    ws.current.onopen = () => {
      console.log("Connection to WS Established");

      //Send en forespørgelse om at abbonnere til brugerens boards
      ws.current.send(JSON.stringify({
        request: 'SUBSCRIBE_BOARD_LIST'
      }));
    }

    ws.current.onmessage = (e) => {
      //Modtag data
      const data = JSON.parse(e.data);
      console.log(data);

      switch (data.response) {
        //Modtag boards
        case 'BOARD_LIST_RESPONSE':
          if (data.owned !== undefined) {
            setOwnedBoards(data.owned.object);
          }

          if (data.memeberOf !== undefined) {
            setMemberBoards(data.memeberOf.object);
          }
          break;

        default:
          break;
      }
    }

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

  function createNewBoard(newBoardDetails) {
    if (ws.current.readyState === WebSocket.OPEN) {

      ws.current.send(JSON.stringify({
        request: 'NEW_BOARD',
        details: newBoardDetails
      }));
    }
  }

  function newBoardDialogue() {
    createPopup(<NewBoard />, "New Board", createNewBoard);
  }

  return (
    <div>
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
          {OwnedBoards != null &&
            OwnedBoards.map((board, index) =>
              <BoardCard
                key={board._id}
                board={board}
              />
            )
          }
        </div>
      </section>
    </div>
  )
}

export default BoardList;