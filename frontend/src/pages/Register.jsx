import { useState } from 'react';
import { toast } from 'react-toastify';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match.', {
        theme: 'colored',
      });
    } else {
      toast.success('Form submitted successfully!', {
        theme: 'colored',
      });
    }
  };

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
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm Password'
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
