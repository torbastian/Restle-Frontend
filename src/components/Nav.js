import { Link, NavLink } from 'react-router-dom';
import { FaUser, FaSquare } from 'react-icons/fa';
import '../styles/Nav.scss';
import { useState } from 'react';
import { ReactComponent as Logo } from '../Restle_Logo.svg';

function Nav() {
  const [expand, setExpand] = useState(false);

  return (
    <nav className={expand ? 'expand' : ''}>
      <Link className='logo link' to='/'>
        <Logo />
        <p>Restle</p>
      </Link>

      <Link className='link' to='/login'>
        <FaUser />
        <p>Login</p>
      </Link>

      <Link className='link' to='/board_overview'>
        <FaSquare />
        <p>Board List</p>
      </Link>
    </nav>
  )
}

export default Nav;