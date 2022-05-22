import { Link } from 'react-router-dom';
import { RiFileAddFill, RiClipboardFill } from 'react-icons/ri';

function Home() {
  return (
    <>
      <header className='heading'>
        <h1>Support Tickets</h1>
        <p>Create a new ticket or view existing?</p>
      </header>

      <section className='form'>
        <Link to='/new-ticket' className='btn btn-reverse btn-block'>
          <RiFileAddFill className='btn-icon' /> Create New
        </Link>

        <Link to='/tickets' className='btn btn-block'>
          <RiClipboardFill className='btn-icon' /> View Existing
        </Link>
      </section>
    </>
  );
}

export default Home;
