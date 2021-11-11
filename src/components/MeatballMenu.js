import { FaEllipsisH } from 'react-icons/fa';
import { useState } from 'react/cjs/react.development';
import '../styles/MeatballMenu.scss';

function MeatballMenu({ options }) {
  const [active, setActive] = useState(false);

  function activate(e) {
    e.stopPropagation();
    setActive(!active);
  }

  return (
    <button className="meatball-menu" onClick={activate} onMouseLeave={() => setActive(false)}>
      <FaEllipsisH />
      <div className={`menu ${active ? '' : 'hidden'}`}>
        {options !== undefined &&
          options.map((option, index) =>
            <li key={index} onClick={option.onClick}>
              <span className='icon'>
                {option.icon !== undefined ? option.icon : ''}
              </span>
              <span className="option-title">
                {option.title}
              </span>
            </li>
          )}
      </div>
    </button>
  )
}

export default MeatballMenu;