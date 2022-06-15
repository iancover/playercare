// Hooks
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Slice
import { logout, reset } from '../features/auth/authSlice';

// Remix Icons
import {
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiUserAddLine,
  // eslint-disable-next-line no-unused-vars
  RiTerminalBoxFill,
} from 'react-icons/ri';
// Ionicons
import { IoGameController } from 'react-icons/io5';

// Nav component
function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav className='nav'>
      <div className='nav-container'>
        <h2 className='logo'>
          <Link to='/' className='logo-link'>
            <IoGameController className='icon' />
            <span className='logo-first'>player</span>.
            <span className='logo-last'>care</span>
          </Link>
        </h2>

        <ul>
          {user ? (
            <li>
              <button className='logout-btn' onClick={onLogout}>
                <RiLogoutCircleLine className='icon' />
                sign out
              </button>
            </li>
          ) : location.pathname === '/' ? (
            <>
              <li>
                <Link to='/login'>
                  <RiLoginCircleLine className='icon' />
                  sign in
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <RiUserAddLine className='icon' />
                  sign up
                </Link>
              </li>
            </>
          ) : location.pathname === '/login' ? (
            <li>
              <Link to='/register'>
                <RiUserAddLine className='icon' />
                sign up
              </Link>
            </li>
          ) : (
            <li>
              <Link to='/login'>
                <RiLoginCircleLine className='icon' />
                sign in
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
