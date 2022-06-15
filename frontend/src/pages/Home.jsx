import { Link } from 'react-router-dom';
import { RiFileAddFill, RiClipboardFill } from 'react-icons/ri';

// Spinner
// import Spinner from '../components/Spinner';

function Home() {
  return (
    <>
      <header className='heading'>
        <h1 className='heading-last' style={{ fontWeight: '500' }}>
          ticket desk
        </h1>
        <p>create new / search existing</p>
      </header>

      <section className='form'>
        <Link to='/new-ticket' className='btn btn-inverse btn-block'>
          <RiFileAddFill className='btn-icon' /> Create
        </Link>

        <Link to='/tickets' className='btn btn-block'>
          <RiClipboardFill className='btn-icon' /> Search
        </Link>
      </section>
    </>
  );
}

export default Home;
