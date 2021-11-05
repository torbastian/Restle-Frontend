import { useParams } from "react-router";

function Board() {
  const { id } = useParams();

  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}

export default Board;