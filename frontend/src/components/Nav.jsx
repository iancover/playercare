import {
  RiLoginCircleLine,
  // eslint-disable-next-line no-unused-vars
  RiLogoutCircleLine,
  RiUser3Line,
  RiTerminalLine,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className='nav'>
      <h2 className='logo'>
        <Link to='/'>
          t soup&nbsp;
          <RiTerminalLine className='icon' />
        </Link>
      </h2>
      <ul>
        <li>
          <Link to='/login'>
            <RiLoginCircleLine className='icon' />
            &nbsp;Login
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <RiUser3Line className='icon' />
            &nbsp;Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
