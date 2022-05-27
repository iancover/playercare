// Hooks
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Slice
import { logout, reset } from '../features/auth/authSlice';

// Icons
import {
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiUserAddLine,
  RiTerminalLine,
} from 'react-icons/ri';

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
      <h2 className='logo'>
        <Link to='/'>
          t soup&nbsp;
          <RiTerminalLine className='icon' />
        </Link>
      </h2>

      <ul>
        {user ? (
          <li>
            <button className='logout-btn' onClick={onLogout}>
              <RiLogoutCircleLine className='icon' />
              Logout
            </button>
          </li>
        ) : location.pathname === '/' ? (
          <>
            <li>
              <Link to='/login'>
                <RiLoginCircleLine className='icon' />
                Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <RiUserAddLine className='icon' />
                Register
              </Link>
            </li>
          </>
        ) : location.pathname === '/login' ? (
          <li>
            <Link to='/register'>
              <RiUserAddLine className='icon' />
              Register
            </Link>
          </li>
        ) : (
          <li>
            <Link to='/login'>
              <RiLoginCircleLine className='icon' />
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
