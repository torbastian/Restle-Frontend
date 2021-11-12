import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaUser, FaSquare, FaChevronRight } from 'react-icons/fa';
import '../styles/Nav.scss';
import { useState } from 'react';
import { ReactComponent as Logo } from '../Restle_Logo.svg';

function Nav() {
  const [expand, setExpand] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className={expand ? 'expand' : ''}>
      <button className="expand-btn" onClick={() => setExpand(!expand)}>
        <FaChevronRight />
      </button>

      <Link className='logo link' to='/'>
        <Logo />
        <p>Restle</p>
      </Link>

      <NavLink className='link' to='/login' isActive={() =>
        ['/login', '/profile', '/register'].includes(pathname)}
        activeClassName="active"
      >
        <FaUser />
        <p>Login</p>
      </NavLink>

      <NavLink className='link' to='/boards' activeClassName="active">
        <FaSquare />
        <p>Board List</p>
      </NavLink>
    </nav>
  )
}

export default Nav;