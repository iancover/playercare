import { Link } from 'react-router-dom';

function TicketItem({ ticket: { _id, status, createdAt, platform, issue } }) {
  return (
    <div className='ticket-item'>
      <div className='ticket-item-date'>
        {new Date(createdAt).toLocaleDateString('en-US')}
      </div>
      <div className={`status status-${status}`}>{status}</div>
      <div className='ticket-item-platform'>
        {platform.toLowerCase().includes('xbox')
          ? 'Xbox'
          : platform.toLowerCase().includes('play')
          ? 'PS5'
          : platform.toLowerCase().includes('nint')
          ? 'Nintendo'
          : 'PC'}
      </div>
      <div className='ticket-item-issue'>{issue}</div>
      <Link
        to={`/ticket/${_id}`}
        className='btn btn-light-outline-orange btn-sm'>
        view
      </Link>
    </div>
  );
}

export default TicketItem;
