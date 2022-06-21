import { Link } from 'react-router-dom';

function TicketItem({ ticket: { _id, status, createdAt, platform, issue } }) {
  return (
    <div
      className={
        status === 'closed'
          ? 'ticket-item bg-dark-1 rounded py-2 px-3 mb-3'
          : 'ticket-item bg-dark-3 rounded py-2 px-3 mb-3'
      }>
      <div className={status === 'closed' ? 'text-grey-4' : 'text-grey-1'}>
        {new Date(createdAt).toLocaleDateString('en-US')}
      </div>
      <div className={`ticket-status ticket-status-${status}`}>{status}</div>
      <div className={status === 'closed' ? 'text-grey-4' : 'text-grey-1'}>
        {platform.toLowerCase().includes('xbox')
          ? 'Xbox'
          : platform.toLowerCase().includes('play')
          ? 'PS5'
          : platform.toLowerCase().includes('nint')
          ? 'Nintendo'
          : 'PC'}
      </div>
      <div className={status === 'closed' ? 'text-grey-4' : 'text-blue'}>
        {issue}
      </div>
      <Link
        to={`/ticket/${_id}`}
        className={
          status === 'closed'
            ? 'btn btn-light-outline-red fw-0 btn-sm rounded'
            : 'btn-light-outline-orange btn-sm rounded'
        }>
        view
      </Link>
    </div>
  );
}

export default TicketItem;
