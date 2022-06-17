import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Component
import Button from '../components/Button';

// Slice
import { createTicket, reset } from '../features/tickets/ticketSlice';
// Issue types data
import { issueTypes } from '../data/issueTypes';
// Toast
import { toast } from 'react-toastify';
// Spinner
import Spinner from '../components/Spinner';
// Ant Design Icons
import { RiFileAddFill } from 'react-icons/ri';

function NewTicket() {
  // get user & tickets from state
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );
  // states (name & email inputs disabled no need to update)
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [platform, setPlatform] = useState('');
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  // ref textarea
  const selectPlatformRef = useRef();
  const selectIssueRef = useRef();
  const textRef = useRef();
  // to dispatch action & payload
  const dispatch = useDispatch();
  // to redirect
  const navigate = useNavigate();
  // on render
  useEffect(() => {
    // mute default option text
    if (selectPlatformRef.current.value === '1') {
      selectPlatformRef.current.className =
        'form-control text-muted-light-blue';
    }
    // mute default option text
    if (selectIssueRef.current.value === '1') {
      selectIssueRef.current.className = 'form-control text-muted-light-blue';
    }
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate('/tickets');
    }
    dispatch(reset());
  }, [
    selectPlatformRef,
    selectIssueRef,
    dispatch,
    isError,
    isSuccess,
    navigate,
    message,
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ platform, issue, description });
    dispatch(createTicket({ platform, issue, description }));
  };

  const onChangePlatform = (e) => {
    setPlatform(e.target.value);
    selectPlatformRef.current.className = 'form-control';
  };

  const onChangeIssue = (e) => {
    const issues = issueTypes();
    selectIssueRef.current.className = 'form-control';
    textRef.current.className = 'form-control opacity-75 fst-italic';
    // desc textarea placeholder matching issue select value
    issues.forEach((issue) => {
      if (e.target.value === issue.type) {
        textRef.current.placeholder = issue.desc;
      }
    });
    setIssue(e.target.value);
  };

  const onChangeDesc = (e) => {
    setDescription(e.target.value);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <header className='heading'>
        <Button nav='Back' url={'/'} />
        <h1>
          <span className='heading-first'>tickets</span>/
          <span className='heading-last'>new</span>
        </h1>
        <p>create a new support ticket</p>
      </header>
      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>player</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='platform'>platform</label>
            <select
              name='platform'
              id='platform'
              className='form-control'
              value={platform}
              ref={selectPlatformRef}
              onChange={onChangePlatform}>
              <option value={1}>-- select device --</option>
              <option>Nintendo Switch</option>
              <option>Xbox Series X</option>
              <option>PlayStation 5</option>
              <option>PC Windows</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='issue'>issue</label>
            <select
              name='issue'
              id='issue'
              className='form-control'
              value={issue}
              ref={selectIssueRef}
              onChange={onChangeIssue}>
              <option value={1}>-- select type --</option>
              <option value={'Malfunction'}>Malfunction</option>
              <option value={'Unresponsive'}>Unresponsive</option>
              <option value={'Connection'}>Connection</option>
              <option value={'Memory'}>Memory</option>
              <option value={'Graphics'}>Graphics</option>
              <option value={'Sounds'}>Sounds</option>
              <option value={'Other'}>Other</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='platform'>description</label>
            <textarea
              className='form-control'
              rows={5}
              ref={textRef}
              value={description}
              onChange={onChangeDesc}
              placeholder='i.e. the game was not responding...'></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-dark-orange btn-block'>
              CREATE
              <RiFileAddFill className='icon' />
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
