import { useLocation } from 'react-router-dom';
import {
  RiLoginCircleLine,
  RiUserAddLine,
  RiTerminalLine,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Nav() {
  let location = useLocation();

  return (
    <nav className='nav'>
      <h2 className='logo'>
        <Link to='/'>
          t soup&nbsp;
          <RiTerminalLine className='icon' />
        </Link>
      </h2>
      <ul>
        {location.pathname === '/' ? (
          <>
            <li>
              <Link to='/login'>
                <RiLoginCircleLine className='icon' />
                &nbsp;Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <RiUserAddLine className='icon' />
                &nbsp;Register
              </Link>
            </li>
          </>
        ) : location.pathname === '/login' ? (
          <li>
            <Link to='/register'>
              <RiUserAddLine className='icon' />
              &nbsp;Register
            </Link>
          </li>
        ) : (
          <li>
            <Link to='/login'>
              <RiLoginCircleLine className='icon' />
              &nbsp;Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
