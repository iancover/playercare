import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Store
import { getTickets, reset } from '../features/tickets/ticketSlice';
// Components
import Button from '../components/Button';
import TicketItem from '../components/TicketItem';
import Spinner from '../components/Spinner';

function Tickets() {
  const { user } = useSelector((state) => state.auth);
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();

  // reset component before mounting
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <header className='heading'>
        <Button nav='Home' url={'/'} />
        <h1>
          <span className='heading-first'>
            player
          </span>
          /<span className='heading-last'>tickets</span>
        </h1>
        <p>open, pending and closed tickets</p>
      </header>
      <div className='tickets'>
        <div className='tickets-headings'>
          <div>date</div>
          <div>status</div>
          <div>platform</div>
          <div>issue type</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

export default Tickets;

// eslint-disable-next-line react-hooks/exhaustive-deps
