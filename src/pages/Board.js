import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";

function Board() {
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

  return (
    <div>
      <h1>{id}</h1>
      <pre>{JSON.stringify(board, null, 2)}</pre>
    </div>
  )
}

export default Board;