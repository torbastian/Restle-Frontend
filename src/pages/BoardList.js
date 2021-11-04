import { useRef, useState, useEffect } from "react";

function BoardList() {
  const [BoardListState, setBoardListState] = useState(null);
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
          setBoardListState(data.boardList);
          break;

        default:
          break;
      }
    }

    return () => {
      //Når siden bliver unloadet, send en forespørgelse om at unsubscribe og luk forbindelsen
      ws.current.send(JSON.stringify({
        request: 'USUBSCRIBE_BOARD_LIST'
      }));

      ws.current.close();
    }
  }, []);

  return (
    <div>
      <h1>
        Board List
      </h1>
    </div>
  )
}

export default BoardList;