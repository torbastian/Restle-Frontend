import { Link, NavLink } from 'react-router-dom';
import { FaUser, FaSquare, FaChevronRight } from 'react-icons/fa';
import '../styles/Nav.scss';
import { useState } from 'react';
import { ReactComponent as Logo } from '../Restle_Logo.svg';

function Nav() {
  const [expand, setExpand] = useState(false);

  return (
    <nav className={expand ? 'expand' : ''}>
      <button className="expand-btn" onClick={() => setExpand(!expand)}>
        <FaChevronRight />
      </button>

      <Link className='logo link' to='/'>
        <Logo />
        <p>Restle</p>
      </Link>

      <Link className='link' to='/login'>
        <FaUser />
        <p>Login</p>
      </Link>

      <Link className='link' to='/boards'>
        <FaSquare />
        <p>Board List</p>
      </Link>

      <Link className='link' to='/AdminOverview'>
        <FaUser />
        <p>Admin Overview</p>
      </Link>
    </nav>
  )
}

export default Nav;