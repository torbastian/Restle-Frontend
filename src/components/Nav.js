import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaUser, FaSquare, FaChevronRight, FaBars, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import '../styles/Nav.scss';
import { useState } from 'react';
import { ReactComponent as Logo } from '../Restle_Logo.svg';
import { useUserContext } from '../hooks/UserContext';

function Nav() {
  const [expand, setExpand] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useUserContext();

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
        {
          user == null ?
            <p>Login</p> : <p>Profil</p>
        }
      </NavLink>

      {
        user !== null &&
        <NavLink className='link' to='/boards' activeClassName="active">
          <FaSquare />
          <p>Board List</p>
        </NavLink>
      }

      {user !== null && user.isAdmin &&
        [
          <NavLink key='1' className='link' to='/AdminOverview' activeClassName="active">
            <FaUsers />
            <p>Admin Overview</p>
          </NavLink>,
          <NavLink key='2' className='link' to='/AdminBoardOverview' activeClassName="active">
            <FaBars />
            <p>Bruger Boards Oversigt</p>
          </NavLink>
        ]
      }

      {user !== null &&
        <li className='link bottom' onClick={logout}>
          <FaSignOutAlt />
          <p>Logout</p>
        </li>
      }
    </nav>
  )
}

export default Nav;