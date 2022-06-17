import { Link } from 'react-router-dom';
import { RiFileAddFill, RiClipboardFill } from 'react-icons/ri';

// Spinner
// import Spinner from '../components/Spinner';

function Home() {
  return (
    <>
      <header className='heading'>
        <h1>
          <span className='heading-first'>help desk</span>/
          <span className='heading-last'>tickets</span>
        </h1>
        <p>search existing or create new ticket</p>
      </header>

      <section className='form'>
        <Link to='/tickets' className='btn btn-inverse-orange btn-block'>
          SEARCH <RiClipboardFill className='btn-icon' />
        </Link>

        <Link to='/new-ticket' className='btn btn-dark-orange btn-block'>
          CREATE <RiFileAddFill className='btn-icon' />
        </Link>
      </section>
    </>
  );
}

export default Home;
