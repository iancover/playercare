// /* eslint-disable */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';

// Slice
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import {
  addNote,
  getNotes,
  reset as notesReset,
} from '../features/notes/noteSlice';
// Components
import Button from '../components/Button';
import NoteItem from '../components/NoteItem';
import Spinner from '../components/Spinner';

Modal.setAppElement('#root');

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );
  const { notes, isLoading: isLoadingNotes } = useSelector(
    (state) => state.notes
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message, { theme: 'dark' });
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [isError, message, dispatch, ticketId]);

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed', { theme: 'dark' });
    navigate('/tickets');
  };

  // Note form submit
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(addNote({ noteText, ticketId }));
    closeModal();
  };

  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || isLoadingNotes) {
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
      </header>
      <div className='ticket-heading bg-dark-4 mb-3 py-5 px-3 rounded'>
        <div className='text-muted-blue'>
          <span className='text-grey-2'>Ticket ID </span>
          {ticket._id}
        </div>
        <div>
          <span className={`ticket-status ticket-status-${ticket.status}`}>
            {ticket.status}
          </span>
        </div>
      </div>
      <div className='ticket-info text-grey-2 bg-dark-3 p-3 my-3 rounded'>
        <div className='fw-4'>
          platform
          <span className='text-blue fw-5 ml-1'> {ticket.platform}</span>
        </div>
        <div className='fw-4'>
          {ticket.status === 'closed' ? (
            <>
              date closed
              <span className='text-red fw-5 ml-1'>
                {new Date(ticket.updatedAt).toLocaleString('en-US')}
              </span>
            </>
          ) : ticket.status === 'pending' ? (
            <>
              date updated
              <span className='text-light-green fw-5 ml-1'>
                {new Date(ticket.updatedAt).toLocaleString('en-US')}
              </span>
            </>
          ) : (
            <>
              date created
              <span className='text-muted-yellow fw-5 ml-1'>
                {new Date(ticket.createdAt).toLocaleString('en-US')}
              </span>
            </>
          )}
        </div>
      </div>

      <div className='ticket-desc bg-dark-4 pt-1 pb-3 px-3 rounded'>
        <h3 className='text-grey-2 m-3'>description</h3>
        <p className='text-blue bg-dark-1 pt-2 pb-6 px-2 rounded'>
          {ticket.description}
        </p>
      </div>

      <div className='ticket-desc bg-dark-3 mt-3 py-3 pr-2 rounded'>
        <h3 className='text-grey-2 mx-6 mb-1'>notes</h3>
        <div className='ml-6 mr-3 mt-3'>
          {ticket.status !== 'closed' && (
            <button
              onClick={openModal}
              className='btn btn-block btn-dark-outline-orange'>
              <FaPlus />
              Add Note
            </button>
          )}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Add Note'
          className='modal'
          overlayClassName='overlay'>
          <div className='bg-dark-4 text-grey-4 p-3 rounded'>
            <h2 className='mb-2'>add note</h2>
            <button className='btn-close' onClick={closeModal}>
              X
            </button>
            <form onSubmit={onNoteSubmit}>
              <div className='form-group mb-2'>
                <textarea
                  name='noteText'
                  id='noteText'
                  className='form-control'
                  placeholder='Enter notes...'
                  rows='5'
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}></textarea>
              </div>
              <div className='form-group'>
                <button
                  className='btn-block btn-dark-outline-blue rounded'
                  type='submit'>
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </Modal>

        <ul className=''>
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </ul>
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
