// Hooks
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Slice
import { logout, reset } from '../features/auth/authSlice';

// Ionicons (logo)
import { IoGameController } from 'react-icons/io5';
// Remix Icons
import {
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiUserAddLine,
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
      <div className='nav-container'>
        <div className='nav-item'>
          <h2 className='nav-logo'>
            <Link to='/' className='text-grey-2'>
              <IoGameController className='icon text-blue fs-5 my-1' />
              <span className='text-orange fw-8'>player</span>.
              <span className='text-blue'>care</span>
            </Link>
          </h2>
        </div>

        <div className='nav-item'>
          <ul>
            {user ? (
              <li>
                <button className='logout-btn' onClick={onLogout}>
                  <RiLogoutCircleLine className='icon text-orange fs-5 my-1' />
                  logout
                </button>
              </li>
            ) : location.pathname === '/' ? (
              <>
                <li>
                  <Link to='/login'>
                    <RiLoginCircleLine className='icon text-orange fs-5 my-1' />
                    login
                  </Link>
                </li>
                <li>
                  <Link to='/register'>
                    <RiUserAddLine className='icon text-orange fs-5 my-1' />
                    register
                  </Link>
                </li>
              </>
            ) : location.pathname === '/login' ? (
              <li>
                <Link to='/register'>
                  <RiUserAddLine className='icon text-orange fs-5 my-1' />
                  register
                </Link>
              </li>
            ) : (
              <li>
                <Link to='/login'>
                  <RiLoginCircleLine className='icon text-orange fs-5 my-1' />
                  login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
