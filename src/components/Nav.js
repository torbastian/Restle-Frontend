import { Link, NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <Link className="logo" to="/">
        <p>Restle</p>
      </Link>

      <Link to="/login">
        <p>Login</p>
      </Link>
    </nav>
  )
}

export default Nav;