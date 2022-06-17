// Hooks
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Redux reducer slice
import { register, reset } from '../features/auth/authSlice';
// Toast
import { toast } from 'react-toastify';
// Spinner
import Spinner from '../components/Spinner';
// Remix Icons
import { RiUserAddLine } from 'react-icons/ri';

// Register component
function Register() {
  // state form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;

  // store dispatch & redirect
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // extract from store
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // error alert or redirect logged in & reset state
  useEffect(() => {
    if (isError) {
      toast.error(message, { theme: 'dark' });
    }
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset()); // authSlice.actions
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  // display input text typed
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // user form data
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match.', {
        theme: 'dark',
      });
    } else {
      const userData = {
        name,
        email,
        password,
      };

      // register w/thunk
      dispatch(register(userData));
    }
  };

  // @todo Add random greeting display

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      <header className='heading'>
        <h1 className='mb-2'>
          <span className='text-grey-2'>player</span>/
          <span className='text-blue'>register</span>
        </h1>
        <p>welcome, please register first</p>
      </header>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group mb-2'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='name'
              required
            />
          </div>

          <div className='form-group mb-2'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='email'
              autoComplete='username'
              required
            />
          </div>

          <div className='form-group mb-2'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='password'
              autoComplete='new-password'
              required
            />
          </div>

          <div className='form-group mb-2'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='confirm password'
              autoComplete='new-password'
              required
            />
          </div>

          <div className='form-group mb-2'>
            <button className='btn btn-dark-orange btn-block'>
              REGISTER
              <RiUserAddLine className='icon text-orange fs-5 mx-2 my-1' />
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
