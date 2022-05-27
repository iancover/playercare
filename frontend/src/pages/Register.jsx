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

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      <header className='heading'>
        <h1>Register</h1>
        <p>Create a new account.</p>
      </header>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Name'
              required
            />
          </div>

          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Email'
              autoComplete='username'
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
              autoComplete='new-password'
              required
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm Password'
              autoComplete='new-password'
              required
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>Create Account</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
