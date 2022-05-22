import { useState } from 'react';
import { toast } from 'react-toastify';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    toast.success('Form submitted successfully!', {
      theme: 'colored',
    });
  };

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
