import '../styles/Home.scss';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <div className="call-to-action">
        <h1>Få en bedre oversigt med Restle</h1>
        <p>Restle hjælper dig og dine grupper
          med at skabe en bedre oversigt over
          jeres arbejdsopgaver
        </p>
        <Link to="/register"><button className="btn">
          Kom i gang
        </button></Link>



      </div>
    </div>
  )
}

export default Home;