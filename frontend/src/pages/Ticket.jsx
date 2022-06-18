import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Slice
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
// Components
import Button from '../components/Button';
import Spinner from '../components/Spinner';

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
  }, [isError, message, dispatch, ticketId]);

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <>
      <header className='heading'>
        <Button nav='Back' url={'/tickets'} />
        <h2
          className='mb-2'
          style={{ fontWeight: 500, textTransform: 'lowercase' }}>
          <span className={'text-grey-2'}>issue type</span>/
          <span className='text-blue'>{ticket.issue}</span>
        </h2>
        {/* <small>text</small> */}
      </header>
      <div className='ticket-heading text-orange bg-dark-4 mb-3 py-5 px-3 rounded'>
        <div>
          <span className='text-grey-2'>Ticket ID </span>
          {ticket._id}
        </div>
        <div>
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </div>
      </div>
      <div className='ticket-info text-grey-2 bg-dark-3 p-3 my-3 rounded'>
        <div className='fw-4'>
          platform{' '}
          <span className='text-orange fw-5 ml-1'> {ticket.platform}</span>
        </div>
        <div className='fw-4'>
          date submitted{' '}
          <span className='text-orange fw-5 ml-1'>
            {new Date(ticket.createdAt).toLocaleString('en-US')}
          </span>
        </div>
      </div>

      <div className='ticket-desc bg-dark-3 py-3 px-3 rounded'>
        <h3 className='text-grey-2 m-3'>description</h3>
        <p className='text-blue bg-dark-1 pt-2 pb-6 px-2 rounded'>
          {ticket.description}
        </p>
      </div>

      {ticket.status !== 'closed' && (
        <button
          onClick={onTicketClose}
          className='btn btn-block btn-inverse-red mt-4'>
          CLOSE TICKET
        </button>
      )}
    </>
  );
}

export default Ticket;
