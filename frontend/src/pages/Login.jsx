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

  if (isLoading) {
    <Spinner />
  }

  return (
    <>
      <header className='heading'>
        <h1>Login</h1>
        <p>Sign in to your existing account.</p>
      </header>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Email'
              required
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Password'
              required
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>Sign In</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
