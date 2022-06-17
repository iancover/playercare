// Hooks
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Slice
import { login, reset } from '../features/auth/authSlice';
// Toast
import { toast } from 'react-toastify';
// Spinner
import Spinner from '../components/Spinner';
// Remix Icons
import { RiLoginCircleLine } from 'react-icons/ri';

// Login component
function Login() {
  // form data state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  // store dispatch & redirect
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // extract from redux store
  const { user, isError, isLoading, isSuccess, message } = useSelector(
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

  // display input text typing
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // login user
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    // login w/thunk
    dispatch(login(userData));
  };

  // @todo  Add random greeting display

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      <header className='heading'>
        <h1 className='mb-2'>
          <span className='text-grey-2'>player</span>/
          <span className='text-blue'>login</span>
        </h1>
        <p>welcome back, please login first</p>
      </header>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group mb-2'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='email'
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
              required
            />
          </div>

          <div className='form-group mb-2'>
            <button className='btn btn-dark-orange btn-block'>
              LOGIN
              <RiLoginCircleLine className='icon text-orange fs-5 mx-2 my-1' />
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
